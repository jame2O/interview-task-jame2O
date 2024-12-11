import axios from 'axios';
import { Request, Response } from 'express';
import { SampleData } from './types';

const DATA_URL = 'https://sampleapi.squaredup.com/integrations/v1/service-desk';

export const GET = async (req: Request, res: Response) => {
    const { datapoints, type, priority, status } = req.query;
    
    try {
        const { data } = await axios.get<SampleData>(`${DATA_URL}?type=${type}&priority=${priority}&status=${status}&datapoints=${datapoints}`)
        res.send(data);
    } catch (error) {
        res.status(500).send({error: 'Failed to fetch requested data'})
    }
}


