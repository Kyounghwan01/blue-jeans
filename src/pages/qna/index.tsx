import { useState, useCallback, SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import BasicLayout from "components/common/BasicLayout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FixedBottomButton from "components/common/FixedBottomButton";

const mainTabs = [
  { id: 0, name: "intro1", title: "캐롯 Pick" },
  { id: 1, name: "intro2", title: "캐롯 추천" }
];

const Index = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    if (e.target.id === "name") {
      setName(res);
    }
  }, []);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <BasicLayout headerTitle="" back={false} footer={false}>
      <div style={{ padding: "30px" }}>
        <input id="name" value={name} onChange={handleChange} />

        <TextField
          error
          id="outlined-error"
          label="Error"
          defaultValue="Hello World"
        />
        <Tabs
          value={value}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>

        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          fullWidth
        />
      </div>
      <FixedBottomButton
        title="다음"
        onClick={() => console.log(1)}
        disabled={true}
      />
    </BasicLayout>
  );
};

export default Index;
