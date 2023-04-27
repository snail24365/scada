import EditMenu from "@/features/scada-edit/Menu/EditMenu";
import EditViewport from "./EditViewport/EditViewport";
import EquipmentPanel from "./EquipmentPanel";
import { EditSectionContext } from "./EditSectionContext";

type Props = {};

const EditSection = (props: Props) => {
  const initialContextValue = {
    rootSvgRef: { current: null },
    rootDivRef: { current: null },
  };
  return (
    <EditSectionContext.Provider value={initialContextValue}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <EditMenu />
        <EditViewport resolutionX={1200} resolutionY={900} />
        <EquipmentPanel />
      </div>
    </EditSectionContext.Provider>
  );
};

export default EditSection;
