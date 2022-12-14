import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { Platform } from "react-native";
import { useTheme } from "native-base";
import { Pools } from "../screens/Pools";
import { Find } from "../screens/Find";
import { New } from "../screens/New";
import { Details } from "../screens/Details";

const { Navigator, Screen } = createBottomTabNavigator()

export const AppRoutes = () => {
  const { colors, sizes } = useTheme()
  const iconSize = sizes[7]
  return (<Navigator
    screenOptions={{
      headerShown: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: colors.yellow[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarStyle: {
        position: 'absolute',
        height: sizes[18],
        borderWidth: 0,
        backgroundColor: colors.gray[800]
      },
      tabBarItemStyle: {
        position: 'relative',
        top: Platform.OS === 'android' ? -5 : 0
      }
    }}
  >
    <Screen
      name="new"
      component={New}
      options={{
        tabBarIcon: ({ color }) => <PlusCircle color={color} size={iconSize} />,
        tabBarLabel: 'Novo bolão'
      }}
    />
    <Screen
      name="pools"
      component={Pools}
      options={{
        tabBarIcon: ({ color }) => <SoccerBall color={color} size={iconSize} />,
        tabBarLabel: 'Meus bolões'
      }}
    />
    <Screen
      name="find"
      component={Find}
      options={{ tabBarButton: () => null }}
    />
    <Screen
      name="details"
      component={Details}
      options={{ tabBarButton: () => null }}
    />
  </Navigator>)
}