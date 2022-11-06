import { useToast } from "native-base"
import { InterfaceToastProps } from "native-base/lib/typescript/components/composites/Toast";

interface UseAlertToastProps extends InterfaceToastProps {
  title: string;
  type: 'warning' | 'error' | 'success',
}
export const useAlertToast = () => {
  const toast = useToast()
  const color = {
    warning: 'yellow.500',
    error: 'red.500',
    success: 'green.500',
  }

  const alertToast = ({ title, type, placement = "top" }: UseAlertToastProps) => toast.show({
    title,
    placement,
    bgColor: color[type]
  })

  return [alertToast]
}