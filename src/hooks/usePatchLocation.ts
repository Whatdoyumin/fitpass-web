import { useMutation } from "@tanstack/react-query";
import { TLocationBody } from "../types/setLocation";
import { patchLocation } from "../apis/setLocation";

function usePatchLocation() {
  return useMutation({
    mutationFn: (data: TLocationBody) => patchLocation(data),
    mutationKey: ["setLocation"],
  });
}

export default usePatchLocation;
