import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Observable, catchError, firstValueFrom, lastValueFrom, map, throwError } from 'rxjs';

@Injectable()
export class HttpCustomService {

    constructor(
        private readonly _httpService: HttpService,
    ) { }

    async get(url) {
        const data = await firstValueFrom(
            this._httpService.get(url).pipe(
                catchError((error: AxiosError) => {
                    throw 'An error happened!';
                }),
            ),
        );
        return data;
    }

    async request(config) {
        const response = await lastValueFrom(this._httpService.request(config));
        return response.data;
    }

}

