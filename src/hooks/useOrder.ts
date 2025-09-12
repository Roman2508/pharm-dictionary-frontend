import { useMemo } from "react";

const useOrder = (data: any) => {
  const orderedData = useMemo(() => {
    if (!data) return [];
    return data.docs.sort((a: any, b: any) => a.order - b.order);
  }, [data]);

  return orderedData;
};

export default useOrder;
