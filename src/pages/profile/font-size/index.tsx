import { useDispatch } from "react-redux";
import useSelectorTyped from "features/useSelectorTyped";
import styled from "styled-components";
import BasicLayout from "components/common/BasicLayout";
import { setFontSizeType } from "features/commonSlice";
import { fontSizeType as fontType } from "features/types/commonSliceType";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Index = () => {
  const dispatch = useDispatch();
  const { fontSizeType } = useSelectorTyped((state) => state.common);

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
      <Block>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="controlled-radio-buttons-group"
            value={fontSizeType}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="smail" control={<Radio />} label="작게" />
            <FormControlLabel value="middle" control={<Radio />} label="중간" />
            <FormControlLabel value="large" control={<Radio />} label="크게" />
          </RadioGroup>
        </FormControl>

        <p className="list-title">
          <span>제목 사이즈입니다.</span>
        </p>
        <p className="custom-font-content">내부 컨텐츠 사이즈 압니다.</p>
      </Block>
    </BasicLayout>
  );
};

const Block = styled.article`
  padding: 16px;
`;

export default Index;
