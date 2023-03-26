import * as Yup from "yup";
import Jobs from "../models/Jobs";
import { Errors } from "../utils/errors";
import Axios from "axios";
import Http from "http";
import CircularJSON from "circular-json";

let jobsController = {
    get: async (req, res) => {
        try {
            var positions = await Axios.get(
                "http://dev3.dansmultipro.co.id/api/recruitment/positions.json"
            );
            // var position = JSON.stringify(positions);
            // var positions = await Http.get(
            //     "http://dev3.dansmultipro.co.id/api/recruitment/positions.json"
            // );
            // // var data = JSON.parse(position);
            console.log(positions.data, "positions");
            res.status(200).json({ status: true, data: positions.data });
        } catch (error) {
            console.log(error, "error");
            throw error;
        }
    },
    detail: async (req, res) => {
        try {
            const { id } = req.params;
            var positions = await Axios.get(
                `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
            );
            console.log(id);
            return res.status(200).json({ status: true, data: positions.data });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: Errors.VALIDATION_FAILS });
        }
    }
};

export default jobsController;
