interface FileContext {
  selectedFile: File;
  previewUrl: string;
}

export type ReceiptState =
  | {
      type: "idle";
    }
  | ({
      type: "selected";
    } & FileContext)
  | ({
      type: "submitting";
    } & FileContext)
  | ({
      type: "error";
      errorMessage?: string;
    } & FileContext);

export type ReceiptAction =
  | {
      type: "SELECT_FILE";
      file: File;
      previewUrl: string;
    }
  | {
      type: "START_UPLOAD";
    }
  | {
      type: "UPLOAD_ERROR";
      errorMessage?: string;
    }
  | {
      type: "RESET";
    };

export const initialReceiptState: ReceiptState = {
  type: "idle",
};

function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${String(value)}`);
}

export function receiptReducer(
  state: ReceiptState,
  action: ReceiptAction
): ReceiptState {
  switch (action.type) {
    case "SELECT_FILE": {
      switch (state.type) {
        case "idle":
        case "selected":
        case "error": {
          return {
            type: "selected",
            selectedFile: action.file,
            previewUrl: action.previewUrl,
          };
        }

        case "submitting": {
          return state;
        }

        default: {
          return assertNever(state);
        }
      }
    }

    case "START_UPLOAD": {
      if (state.type !== "selected" && state.type !== "error") {
        return state;
      }

      return {
        type: "submitting",
        selectedFile: state.selectedFile,
        previewUrl: state.previewUrl,
      };
    }

    case "UPLOAD_ERROR": {
      if (state.type !== "submitting") {
        return state;
      }

      return {
        type: "error",
        selectedFile: state.selectedFile,
        previewUrl: state.previewUrl,
        errorMessage: action.errorMessage,
      };
    }

    case "RESET": {
      if (state.type === "idle") {
        return state;
      }

      return initialReceiptState;
    }

    default: {
      return assertNever(action);
    }
  }
}
