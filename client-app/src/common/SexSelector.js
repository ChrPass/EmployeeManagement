import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    height: "100%",
  },
}));

const sexOptionsIndexes = { "male": 0, "female": 1, "other":2}
const reverseSexOptionsIndexes = { 0: "male", 1: "female", 2: "other"}

const SexSelector = (props) => {
  const { selected, setSelected } = props;
  const classes = useStyles();

  const handleChange = (e) => {
    setSelected((value) => ({ ...value, sex: reverseSexOptionsIndexes[e.target.value] }));
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="sex">Sex</InputLabel>
      <Select
        labelId="sex"
        id="sex"
        value={selected ? sexOptionsIndexes[selected] : ""}
        onChange={handleChange}
        label="Sex"
      >
        <MenuItem value={0}>Male</MenuItem>
        <MenuItem value={1}>Female</MenuItem>
        <MenuItem value={2}>Other</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SexSelector;
