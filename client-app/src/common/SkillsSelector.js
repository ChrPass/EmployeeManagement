import React, { useState, useEffect } from "react";
import Axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function MultipleSelectionCompo(props) {
  const { selectedData, setSelectedData } = props;
  const  [data, setData] = useState([]);
  const getSkills = async () => {
    await Axios({
      method: "get",
      url: process.env.REACT_APP_API_PATH + "Skills",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        res.data.map(item => {
          item.value = item.id;
          item.label = item.name;
        })
        setData(res.data);
      })
      .catch((err) => {
        alert("Something went wrong on Skills loading. Please try again later.");
      });
  };

  useEffect(() => {
    getSkills()
  }, []);

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={selectedData ? selectedData : []}
      isMulti
      onChange={(e) => {
        setSelectedData([...e]);
      }}
      options={data}
    />
  );
}
