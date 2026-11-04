import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import "dotenv/config";
import { Planet } from "../src/models/planets.js";
import { Star } from "../src/models/stars.js";

const uri = process.env.MONGO_URI;

// Função genérica para ler e popular uma coleção
async function popularColecao(db, nomeColecao, nomeArquivoJson) {
  try {
    const caminhoArquivo = path.resolve(
      "backend",
      "seeds",
      "data",
      nomeArquivoJson,
    );

    const dadosRaw = await fs.readFile(caminhoArquivo, "utf-8");
    const dados = JSON.parse(dadosRaw);

    if (nomeColecao === "planets") {
      const sol = await db.collection("stars").findOne({
        slug: "sun",
      });

      if (!sol) {
        throw new Error("Sol não encontrado no banco de dados");
      }

      dados.forEach((planeta) => {
        console.log("HostStar:", dados[0].hostStar);
        console.log(
          "É ObjectId?",
          dados[0].hostStar instanceof mongoose.Types.ObjectId,
        );
        planeta.hostStar = sol._id;
      });
    }

    const Model = nomeColecao === "planets" ? Planet : Star;

    // Validar antes de apagar os documentos
    for (const dado of dados) {
      await new Model(dado).validate();
    }

    await Model.deleteMany({});

    const resultado = await Model.insertMany(dados);

    console.log(
      `✅ [${nomeColecao}]: ${resultado.length} documentos inseridos com sucesso.`,
    );
  } catch (erro) {
    console.error(
      `❌ Erro ao popular a coleção [${nomeColecao}]:`,
      erro.message,
    );
    throw erro;
  }
}

async function iniciarSeed() {
  try {
    console.log("⏳ Conectando ao MongoDB Atlas...");

    await mongoose.connect(uri);

    const db = mongoose.connection.db;

    console.log("🚀 Iniciando população do banco...");

    await popularColecao(db, "stars", "stars.json");
    await popularColecao(db, "planets", "planets.json");

    console.log("✅ Banco populado com sucesso!");
  } catch (erro) {
    console.error("❌ Erro na execução do seed:", erro);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Conexão encerrada.");
  }
}

iniciarSeed();
