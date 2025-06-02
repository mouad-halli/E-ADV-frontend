import { Pressable, StyleSheet, View } from "react-native"
import { useLinkBuilder, useTheme } from '@react-navigation/native'
import { Text, PlatformPressable } from '@react-navigation/elements'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useUserContext } from "@/contexts/userContext"
import Logo from "./ui/icons/Logo"
import { globalStyles } from "@/styles/globalStyles"
import ProfileIcon from "./ui/icons/ProfileIcon"
import SettingIcon from "./ui/icons/SettingIcon"
import { useAppContext } from "@/contexts/appContext"
import colors from "@/styles/colors"
import WhiteCheckMark from "./ui/icons/WhiteCheckMark"
import { useGlobalSearchParams } from "expo-router"
import { router } from "expo-router"

export default function Navbar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { buildHref } = useLinkBuilder()
    const { user, handleLogout } = useUserContext()
    const { isAppointmentSelected } = useAppContext()
    const { productId } = useGlobalSearchParams()

    const isLinkPressable = (routeName: string) => {
        // const currentRoute = state.routes[state.index].name

        if ((routeName === 'products' && !isAppointmentSelected()) || productId)
            return false
        return true

    }

    const isLinkChecked = (routeName: string) => {
        if (routeName === 'Appointments' && isAppointmentSelected()) {
            return true
        }
        if (routeName === 'products' && productId)
            return true
        return false
      }
  
    return (
        <View className="w-full flex-row items-center px-8 absolute py-4">
            <View className="w-1/3">
              <Pressable
                onLongPress={() => router.push(__DEV__ ? "/_sitemap" : "/") }
              >
                <Logo />
              </Pressable>
            </View>
        <View className="flex-1 flex-row justify-center gap-x-8" >
        {state.routes[state.index].name !== 'index' && state.routes.map((route, index) => {
          const { options } = descriptors[route.key]

          if (["index", "presentation", "testo"].includes(route.name))
            return false

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name

          const isFocused = state.index === index
  
          const onPress = () => {
            if (!isLinkPressable(route.name))
                return
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          return (
            !productId && <PlatformPressable
                key={route.name}
                href={buildHref(route.name, route.params)}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                className="flex-row items-center"
                // onLongPress={onLongPress}
                style={[isLinkChecked(route.name) ? styles.linkCheckedButton : null]}
            >
                <Text
                    style={isLinkChecked(route.name) ? styles.linkChecked : (isFocused ? styles.activeLink : styles.link)}
                    // style={isFocused ? checkedLink ? styles.linkChecked : styles.activeLink : styles.link}
                >
                    {label.toString()}
              </Text>
              {productId && isLinkChecked(route.name) && <WhiteCheckMark />}
            </PlatformPressable>
          )
        })}
      </View>
        <View className="w-1/3 flex-row justify-end items-center gap-x-4">
            <Pressable
                style={{ elevation: 10 }}
                className="p-2 rounded-full bg-primary"
                onPress={() => handleLogout()}
            >
                <SettingIcon />
            </Pressable>
            <View
                style={{ elevation: 10 }}
                className="flex-row gap-x-2 items-center bg-primary px-5 py-2 rounded-full max-w-full "
            >
                <ProfileIcon />
                <Text
                    style={[globalStyles.robotoMedium, { color: "white", fontSize: 16 }]}
                    numberOfLines={1}
                >
                    {`${user?.firstName} ${user?.lastName}`}
                </Text>
            </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    link: {
        fontSize: 20,
        color: colors.grey,
        ...globalStyles.robotoMedium
    },
    activeLink: {
        fontSize: 20,
        color: colors.primary,
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
        ...globalStyles.robotoMedium
    },
    linkChecked: {
        fontSize: 20,
        color: colors.white,
        ...globalStyles.robotoMedium
    },
    linkCheckedButton: {
        flexDirection: "row",
        gap: 10,
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 3,
    }
})
