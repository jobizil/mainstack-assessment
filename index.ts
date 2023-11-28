import app from "./app";
import { PORT } from "./src/utils/config";

app.listen(PORT, () => {
    console.log("===========================================");
    console.log(`Server running on port ${PORT}`);
    console.log("=========================================== \n");
});