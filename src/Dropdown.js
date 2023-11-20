import React, { useState, useEffect } from 'react';
import './index.css'; 
import { MdTune } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";

const FloatingDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [groupingValue, setGroupingValue] = useState('status');
  const [orderingValue, setOrderingValue] = useState('priority');

  const handleGroupingChange = (e) => {
    setGroupingValue(e.target.value);
    
  };

  const handleOrderingChange = (e) => {
    setOrderingValue(e.target.value);
    
    
  };


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
        
        
    <div className='floating'>
    
      <button className='btn' onClick={toggleDropdown}><MdTune /><span className='icon-text'>&nbsp;Display &nbsp;</span><FaAngleDown /></button>

      {showDropdown && (
        <div className="floating-dropdown">
          <div className='option'>
          <label>Grouping</label>
          <select className='btn2' value={groupingValue} onChange={handleGroupingChange}>
            
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          
          </select>
          </div>
          <div className='option'>  
          <label>Ordering</label>
          <select className='btn2' value={orderingValue} onChange={handleOrderingChange}>
          
            <option value="priority">Priority</option>
            <option value="title">Title</option>
           
          </select>
          
          </div>

        </div>
      )}
      
    </div>
    </div>
  );
};

const CardComponent = ({ tasks, status }) => {
    return (
      <div className="card-group">
        <h3><LuListTodo />  {status}</h3>
        {tasks.map((task) => (
          <div key={task.id} className="card">
            <p>{task.id}</p>
            <h4>{task.title}</h4>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>{task.tag}</p>
            {/* Add more details or components as needed */}
          </div>
        ))}
      </div>
    );
};

const Board = ({groupingValue, orderingValue}) => {
    const url = "https://api.quicksell.co/v1/internal/frontend-assignment";

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [groupedData, setGroupedData] = useState(data);

    
  
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error('Network response was not ok.');
              }
              const fetchedData = await response.json();
              setData(fetchedData);
              if(data.length!== 0 && data!==null && data!== undefined){
                console.log(data)
                const groupedData = data.tickets.reduce((acc, item) => {
                    const { status } = item;
                    if (!acc[status]) {
                      acc[status] = [];
                    }
                    acc[status].push(item);
                    return acc;
                }, {});
                console.log(groupedData)
                setGroupedData(groupedData)
            }
            } catch (error) {
              setError(error);
            }
        }; 
        fetchData();

        


        
    }, []);

    
    

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    if (!data) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="card-group-container">
            {Object.keys(groupedData).map((status) => (
                <CardComponent key={status} tasks={groupedData[status]} status={status} />
            ))}
        </div>
        
    );
}

export {FloatingDropdown, Board};

