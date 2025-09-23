// App.js
import { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList, View, ActivityIndicator, Platform } from "react-native";

// Cambia por la IP LAN de tu PC cuando pruebes en emulador/dispositivo real
const API_BASE = Platform.select({
  web: "http://localhost:3001",
  default: "http://192.168.1.70:3001" // tu IP local + puerto del servidor
});

export default function App() {
  const [health, setHealth] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const h = await fetch(`${API_BASE}/health`).then(r => r.json());
        setHealth(h);
        const p = await fetch(`${API_BASE}/pedidos`).then(r => r.json());
        setPedidos(p);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return (
    <SafeAreaView style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
      <ActivityIndicator />
      <Text>Cargando…</Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Seguimiento de Pedidos</Text>
      <Text style={{ marginVertical: 8 }}>
        Backend: {health ? `${health.service} (DB: ${health.db})` : "sin conexión"}
      </Text>

      <Text style={{ fontWeight: "600", marginTop: 12 }}>Pedidos (demo):</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text>#{item.id} · {item.titulo}</Text>
            <Text>Estado: {item.estado_actual}</Text>
            <Text>Creado: {new Date(item.creado_en).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay pedidos</Text>}
      />
    </SafeAreaView>
  );
}
