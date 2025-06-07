import {
  Scale,
  FileLock,
  ArrowDownNarrowWide,
  Target,
  Database,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

const iconMap = {
  lawfulness_fairness_and_transparency: Scale,
  purpose_limitation: FileLock,
  data_minimization: ArrowDownNarrowWide,
  accuracy: Target,
  storage_limitation: Database,
  integrity_and_confidentiality: ShieldCheck,
  accountability: ClipboardList,
};

export default iconMap;
