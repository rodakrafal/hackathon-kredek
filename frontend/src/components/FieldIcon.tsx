import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";

interface IconsProps {
  [name: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}
const icons: IconsProps = {
    "Map": MapIcon,
    "Light": LightbulbIcon,
    "Calculator": CalculateIcon,
    "Menu": MenuIcon,
    "Logo": ModelTrainingIcon,
  };
  
  export const FieldIcon = ({ name }: { name: string }) => {
    const Icon = icons[name];
    return Icon ? <Icon color="primary" fontSize="large"/> : null;
  };
  