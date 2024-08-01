import { useState } from "react";
import { toast } from "react-toastify";
import InlineFormHead from "./InlineFormHead";
import InlineFormBody from "./InlineFormBody";
import LinkedButtons from "./LinkedButtons";
import postSwapData from "utils/postSwapData";
import isOutdated from "utils/isOutdated";
import 'styles/InlineForm.scss';

const InlineForm = ({ BASEURL, todayDate }) => {

  const [shifts, setShifts] = useState(
    [
      {
        isOvernight: false, 
        Date: '', 
        Outbound: '', 
        Inbound: '', 
        Position:'', 
        Early: false, 
        Late: false, 
        LTA: false, 
        DO: false
      }
    ]
  );

  const handleChange = (index, fieldName, fieldValue) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][fieldName] = fieldValue;
    setShifts(updatedShifts);
  };

  const addShift = () => {
    const newShifts = [
      ...shifts, 
      {
        isOvernight: false, 
        Date: '', 
        Outbound: '', 
        Inbound: '', 
        Position:'', 
        Early: false, 
        Late: false, 
        LTA: false, 
        DO: false
      }
    ];
    setShifts(newShifts)
  };

  const deleteShift = (index) => {
    const updatedShifts = [...shifts];
    updatedShifts.splice(index, 1);
    setShifts(updatedShifts);
  };

  const ovSwitch = (index) => { 
    const updatedShifts = [...shifts];
    updatedShifts[index].isOvernight = !updatedShifts[index].isOvernight;
    setShifts(updatedShifts)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAnyOutdated = shifts.some(shift => shift.Date && isOutdated(todayDate, new Date(shift.Date)));

    isAnyOutdated ? 
      toast.error('Oops... You can\'t submit an outdated swap 🤓') 
      : postSwapData({BASEURL, shifts, e});
  };

  return (
    <>
      <div className="inlineForm">
        <form onSubmit={handleSubmit}>
            <input 
              name="Email"
              type="email" 
              placeholder="Email"  
              style={{marginBottom: '4px'}} 
            />
            <div className="overflow">
              <table>
                <InlineFormHead />
                <InlineFormBody
                  changeHandlers={{shifts, handleChange, addShift, deleteShift, ovSwitch}}
                />
              </table>
            </div>
            <button 
              className="submit-button" 
              type="submit"
              >Submit</button>  
          </form>
          <LinkedButtons />
      </div>
    </>
  )
};

export default InlineForm;