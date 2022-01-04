import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";

interface IList {
  title: string;
  // icon: JSX.Element;
  func: () => void;
}

const Index = ({ title, func }: IList) => {
  return (
    <>
      <ListItem
        onClick={func}
        disablePadding
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <ChevronRightIcon />
          </IconButton>
        }
      >
        <ListItemButton>
          {/* <ListItemIcon>{Icon}</ListItemIcon> */}
          <ListItemText className="list-title" primary={title} />
        </ListItemButton>
      </ListItem>
      <Divider light />
    </>
  );
};

export default Index;
