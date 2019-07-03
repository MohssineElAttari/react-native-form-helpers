import React, { Component } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Switch
} from "react-native";
import { validationService } from "./validation/service";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        first_name: {
          type: "generic",
          value: ""
        },
        last_name: {
          type: "generic",
          value: ""
        },
        birthday_month: {
          type: "month",
          value: ""
        },
        birthday_day: {
          type: "day",
          value: ""
        },
        state: {
          type: "state",
          value: ""
        },
        zip: {
          type: "zip",
          value: ""
        },
        tos: {
          type: "bool",
          value: false
        }
      }
    };

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.setInputPosition = validationService.setInputPosition.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.getFormValidation();
  }

  renderError(id) {
    const { inputs } = this.state;
    if (inputs[id].errorLabel) {
      return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
    }
    return null;
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView>
          <View
            onLayout={({ nativeEvent }) => {
              this.setInputPosition({
                ids: ["first_name"],
                value: nativeEvent.layout.y
              });
            }}
          >
            <Text>First Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => {
                this.onInputChange({ id: "first_name", value });
              }}
            />
            {this.renderError("first_name")}
          </View>

          <View
            onLayout={({ nativeEvent }) => {
              this.setInputPosition({
                ids: ["last_name"],
                value: nativeEvent.layout.y
              });
            }}
          >
            <Text>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => {
                this.onInputChange({ id: "last_name", value });
              }}
            />
            {this.renderError("last_name")}
          </View>

          <View
            onLayout={({ nativeEvent }) => {
              this.setInputPosition({
                ids: ["birthday_month", "birthday_day"],
                value: nativeEvent.layout.y
              });
            }}
          >
            <Text>Birthday?</Text>
            <View style={styles.split}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Month"
                  onChangeText={value => {
                    this.onInputChange({ id: "birthday_month", value });
                  }}
                />
                {this.renderError("birthday_month")}
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Day"
                  onChangeText={value => {
                    this.onInputChange({ id: "birthday_day", value });
                  }}
                />
                {this.renderError("birthday_day")}
              </View>
            </View>
          </View>

          <View
            onLayout={({ nativeEvent }) => {
              this.setInputPosition({
                ids: ["state"],
                value: nativeEvent.layout.y
              });
            }}
          >
            <Text>State</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => {
                this.onInputChange({ id: "state", value });
              }}
              autoCapitalize="characters"
              maxLength={2}
            />
            {this.renderError("state")}
          </View>

          <View
            onLayout={({ nativeEvent }) => {
              this.setInputPosition({
                ids: ["zip"],
                value: nativeEvent.layout.y
              });
            }}
          >
            <Text>Zip</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => {
                this.onInputChange({ id: "zip", value });
              }}
              maxLength={5}
              keyboardType="number-pad"
            />
            {this.renderError("zip")}
          </View>

          <View
            onLayout={({ nativeEvent }) => {
              this.setInputPosition({
                ids: ["tos"],
                value: nativeEvent.layout.y
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 20
              }}
            >
              <Switch
                value={this.state.inputs.tos.value}
                onValueChange={value => {
                  this.onInputChange({ id: "tos", value });
                }}
              />
              <Text style={{ paddingLeft: 10 }}>Do you agree to the TOS?</Text>
            </View>
            {this.renderError("tos")}
          </View>
        </ScrollView>

        <View style={styles.button}>
          <Button title="Submit Form" onPress={this.submit} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 50,
    paddingBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 15,
    alignSelf: "stretch"
  },
  split: {
    flexDirection: "row"
  },
  error: {
    position: "absolute",
    bottom: 0,
    color: "red",
    fontSize: 12
  },
  button: {
    flex: 0,
    justifyContent: "flex-end"
  }
});
