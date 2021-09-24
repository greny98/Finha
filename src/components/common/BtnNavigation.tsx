import React from "react";
import { Button, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, Image, TouchableOpacity, TouchableHighlight } from "react-native";

interface Props {
  text:string;
  active:boolean;
  iconActive:any;
  icon:any
}

const BtnNavigation = (props: Props) => {
  const { iconActive, icon, text, active } = props;
  return (
    <TouchableHighlight style={styles.btnContainer} underlayColor="#aeb5f5" onPress={() => console.log("Pressed!")}>
      <Layout style={[styles.btnContainer, {backgroundColor: 'transparent'}]}>
        <Image source={active ? iconActive : icon} />
        {active && <Text style={styles.textStyle}>{text}</Text>}
      </Layout>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 130,
    height: 36,
    borderRadius: 16,
    backgroundColor: "#EBEDFF",
    paddingLeft: 8,
    paddingRight: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red"
  },
  textStyle: {
    color: "#2A327D",
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "bold"
  }
});

export default BtnNavigation;
