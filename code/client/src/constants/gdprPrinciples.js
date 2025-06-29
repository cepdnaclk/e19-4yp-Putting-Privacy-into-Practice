import {
  Scale,
  FileLock,
  ArrowDownNarrowWide,
  Target,
  Database,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

const PRINCIPLES = [
  {
    value: "lawfulness_fairness_transparency",
    label: "Lawfulness, Fairness & Transparency",
    description:
      "Personal data must be processed lawfully, fairly and in a transparent manner.",
    icon: Scale,
  },
  {
    value: "purpose_limitation",
    label: "Purpose Limitation",
    description:
      "Personal data must be collected for specified, explicit and legitimate purposes.",
    icon: FileLock,
  },
  {
    value: "data_minimization",
    label: "Data Minimization",
    description:
      "Personal data must be adequate, relevant and limited to what is necessary.",
    icon: ArrowDownNarrowWide,
  },
  {
    value: "accuracy",
    label: "Accuracy",
    description:
      "Personal data must be accurate and, where necessary, kept up to date.",
    icon: Target,
  },
  {
    value: "storage_limitation",
    label: "Storage Limitation",
    description:
      "Personal data must be kept in a form which permits identification for no longer than necessary.",
    icon: Database,
  },
  {
    value: "integrity_confidentiality",
    label: "Integrity & Confidentiality",
    description:
      "Personal data must be processed in a manner that ensures appropriate security.",
    icon: ShieldCheck,
  },
  {
    value: "accountability",
    label: "Accountability",
    description:
      "Organizations must take responsibility for data processing and demonstrate GDPR compliance.",
    icon: ClipboardList,
  },
];

export const GDPR_PRINCIPLES = PRINCIPLES;

export const GDPR_PRINCIPLE = PRINCIPLES.reduce((obj, principle) => {
  obj[principle.value] = principle;
  return obj;
}, {});

export const {
  lawfulness_fairness_transparency,
  purpose_limitation,
  data_minimization,
  accuracy,
  storage_limitation,
  integrity_confidentiality,
  accountability,
} = GDPR_PRINCIPLE;

export const getPrinciple = (value) => GDPR_PRINCIPLE[value];

export const getPrincipleLabel = (value) =>
  GDPR_PRINCIPLE[value]?.label || value;
