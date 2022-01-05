import { useSelector, useDispatch } from "react-redux";
import BasicLayout from "components/common/BasicLayout";
import { RootState } from "app/store";
import { setFontSizeType } from "features/commonSlice";
import { fontSizeType as fontType } from "features/types/commonSliceType";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import withAuth from "components/common/withAuth";

const Index = () => {
  const dispatch = useDispatch();
  const { fontSizeType } = useSelector((state: RootState) => state.common);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value as fontType;
    dispatch(setFontSizeType(value));
  };

  return (
    <BasicLayout
      headerTitle="폰트사이즈수정"
      back={true}
      footer={false}
      // loading={loading}
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">폰트사이즈</FormLabel>
        <h1 className="custom-font-h1">h1입니다</h1>
        <h2>h2입니다</h2>
        <h3>h3입니다</h3>
        <h4>h4입니다</h4>
        <RadioGroup
          aria-label="gender"
          name="controlled-radio-buttons-group"
          value={fontSizeType}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="smail" control={<Radio />} label="smail" />
          <FormControlLabel value="middle" control={<Radio />} label="middle" />
          <FormControlLabel value="large" control={<Radio />} label="large" />
        </RadioGroup>
      </FormControl>
    </BasicLayout>
  );
};

export default withAuth(Index);
