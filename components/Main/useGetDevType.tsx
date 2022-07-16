import { useEffect, useState } from 'react'

export const useGetDevType = () => {
    const [deviceType, setDeviceType] = useState("");
    useEffect(() => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
          navigator.userAgent
        )
      ) {
        setDeviceType("Mobile");
      } else {
        setDeviceType("Desktop");
      }
    }, []);
  return deviceType;
}
