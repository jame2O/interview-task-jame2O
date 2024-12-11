import axios from 'axios';
import { Request, Response } from 'express';
import { SampleData } from './types';

const DATA_URL = 'https://sampleapi.squaredup.com/integrations/v1/service-desk';

export const GET = async (req: Request, res: Response) => {
    const { data } = await axios.get<SampleData>(DATA_URL)
    res.send(data);
};
export const POST = async (req: Request, res: Response) => {
    const { datapoints, type } = req.query;
    
    try {
        const { data } = await axios.get<SampleData>(DATA_URL, {
            params: {
                datapoints,
                type
            }
        });
        res.send(data);
    } catch (error) {
        res.status(500).send({error: 'Failed to fetch requested data'})
    }
}

