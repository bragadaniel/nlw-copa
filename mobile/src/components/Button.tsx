import { Button as BtnNativeBase, Text, IButtonProps } from "native-base"

interface Props extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | "SECONDARY"
}
export const Button = ({ title, type, ...rest }: Props) => {
  const bg = type === 'PRIMARY' ? 'red.500' : 'yellow.500'
  const bgPressed = type === 'PRIMARY' ? 'red.400' : 'yellow.400'
  const textColor = type === "PRIMARY" ? "white" : "black"
  return <BtnNativeBase
    w="full"
    h={14}
    rounded="sm"
    fontSize="md"
    textTransform="uppecase"
    bg={bg}
    _pressed={{
      bg: bgPressed
    }}
    _loading={{
      _spinner: { color: 'black' }
    }}
    {...rest}
  >
    <Text
      fontSize='sm'
      color={textColor}
      fontFamily="heading"
    >
      {title}
    </Text>
  </BtnNativeBase>
}

Button.defaultProps = {
  type: 'PRIMARY'
}