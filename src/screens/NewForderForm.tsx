import { Button, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import TextInputGroup from "../components/TextInputGroup";

const NewForderForm = () => {
  const [folderName, setFolderName] = useState("");
  const [walletType, setWalletType] = useState("");
  const [moneyAmount, setMoneyAmount] = useState(0);
  const [notes, setNotes] = useState("");


  return (
    <Layout style={styles.root}>
      <TextInputGroup
        style={styles.textInput}
        layoutProps={{ style: styles.textInputLayout }}
        onChangeText={text => setFolderName(text)}
        label="Tên danh mục"
      />
      <TextInputGroup
        style={styles.textInput}
        layoutProps={{ style: styles.textInputLayout }}
        onChangeText={text => setWalletType(text)}
        label="Loại ví"
      />
      <TextInputGroup
        style={styles.textInput}
        layoutProps={{ style: styles.textInputLayout }}
        onChangeText={text => setMoneyAmount(Number(text))}
        label="Số tiền"
        keyboardType="numeric"
      />
      <TextInputGroup
        style={styles.textInput}
        layoutProps={{ style: styles.textInputLayout }}
        onChangeText={text => setNotes(text)}
        label="Ghi chú"
      />
      <Button style={styles.button} appearance="filled" size="medium">
        <Text style={styles.buttonText}>Lưu</Text>
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    width: "100%"
  },
  textInputLayout: {
    width: "90%",
    marginBottom: 24
  },
  textInput: {
    borderRadius: 50
  },
  button: {
    width: 150,
    backgroundColor: "#00C6C6",
    borderColor: "#00C6C6",
    borderRadius: 100
  },
  buttonText: {
    fontSize: 16
  }
});

export default NewForderForm;
