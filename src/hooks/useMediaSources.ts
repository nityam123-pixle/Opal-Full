import { getMediaSources } from "@/lib/utils";
import { useReducer } from "react";

export type SourceDeviceStateProps = {
  displays: {
    appIcon: null;
    display_id: string;
    id: string;
    name: string;
    thubnail: unknown[];
  }[];
  audioInputs?: {
    deviceId: string;
    kind: string;
    label: string;
    groupId: string;
  }[];
  error?: string | null;
  isPending?: boolean;
};

type DisplayDeviceActionProps = {
  type: "GET_DEVICES";
  payload: SourceDeviceStateProps;
};

export const useMediaSources = () => {
  const [state, action] = useReducer(
    (state: SourceDeviceStateProps, action: DisplayDeviceActionProps) => {
      switch (action.type) {
        case "GET_DEVICES":
          return { ...state, ...action.payload };

        default:
          return state;
      }
    },
    {
      displays: [],
      audioInputs: [],
      error: null,
      isPending: false,
    }
  );

  const fetchMediaResources = () => {
    action({
      type: "GET_DEVICES",
      payload: {
        isPending: true,
        displays: [],
      },
    });
    getMediaSources().then((source) =>
      action({
        type: "GET_DEVICES",
        payload: {
          displays: source.displays,
          audioInputs: source.audio,
        },
      })
    );
  };

  return { state, fetchMediaResources };
};
