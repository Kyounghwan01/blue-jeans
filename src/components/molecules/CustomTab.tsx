import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface ICustomTab {
  tabElement: { label: string }[];
  tab: number;
  setTab: (event: React.SyntheticEvent, newValue: number) => void;
}
const CustomTab = ({ tabElement, tab, setTab }: ICustomTab) => {
  return (
    <Tabs value={tab} onChange={setTab} variant="fullWidth">
      {tabElement.map((el) => (
        <Tab key={el.label} label={el.label} />
      ))}
    </Tabs>
  );
};

export default CustomTab;
