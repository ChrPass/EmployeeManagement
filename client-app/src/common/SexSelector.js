import Select from 'react-select';

const sexOptions = [
    {value: "male", label: "Male"},
    {value: "female", label: "Female"},
    {value: "other", label: "Other"},
]

const SexSelector = (props) => {
    const { selected, setSelected } = props;

    const handleChange = (e) => {
        setSelected(value => ({...value, sex: e ? e.value : null}))
    }   

    const selectedIndex = sexOptions.findIndex(item => item.value == selected);
    return (
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={sexOptions[0]}
          isDisabled={false}
          isLoading={false}
          isClearable={true}
          isRtl={false}
          isSearchable={true}
          name="Sex"
          options={sexOptions}
          value={selectedIndex || selectedIndex == 0 ? sexOptions[selectedIndex] : null}
          onChange={handleChange}
        />
    );
}

export default SexSelector;