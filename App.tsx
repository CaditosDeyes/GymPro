import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import INICIO from "./Navegacion";

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <INICIO/>
    </SafeAreaProvider>
  );
}

export default App;