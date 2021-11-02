/*
 * Copyright (c) 2020-present Katan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { inject, injectable } from "inversify-props";
import { AxiosResponse } from "axios";
import { buildSortingQueryString } from "@/app/shared/utils/text";
import { ServerModel } from "@/app/server/models/server.model";
import { HttpService } from "@/app/app-network/services/http.service";
import {
	ServerFileSystemDiskModel,
	ServerFileSystemFileModel,
	ServerFileSystemModel
} from "@/app/server/models/server-file-system.model";

@injectable()
export class ServerService {
	constructor(@inject() private readonly httpService: HttpService) {}

	public async listServers(
		filters?: Partial<ServerModel>
	): Promise<ServerModel[]> {
		return this.httpService
			.get(buildSortingQueryString("servers", filters))
			.then((res: AxiosResponse) => {
				return res.data.data.servers;
			});
	}

	public async findServer(id: number): Promise<ServerModel> {
		return this.httpService
			.get(`servers/${id}`)
			.then((res: AxiosResponse) => {
				return res.data.data.server;
			});
	}

	public async startServer(id: number): Promise<unknown> {
		return this.httpService.get(`servers/${id}/start`);
	}

	public async stopServer(id: number): Promise<unknown> {
		return this.httpService.get(`servers/${id}/stop`);
	}

	public async updateServer(
		id: number,
		server: Partial<ServerModel>
	): Promise<unknown> {
		return this.httpService.patch(`servers/${server.id}/stop`, {
			"server-id": id,
			data: server
		});
	}

	public async findServerFileSystem(
		serverId: string
	): Promise<ServerFileSystemModel> {
		return this.httpService
			.get(`servers/${serverId}/fs`)
			.then((res: AxiosResponse) => {
				return res.data.data.fs;
			});
	}

	public async findServerFileSystemDisk(
		serverId: string,
		diskId: string
	): Promise<ServerFileSystemDiskModel> {
		return this.httpService
			.get(`servers/${serverId}/fs/disk/${diskId}`)
			.then((res: AxiosResponse) => {
				return res.data.data.disk;
			});
	}

	public async listServerFileSystemDiskFiles(
		serverId: string,
		diskId: string
	): Promise<ServerFileSystemFileModel[]> {
		return this.httpService
			.get(`servers/${serverId}/fs/disk/${diskId}/files`)
			.then((res: AxiosResponse) => {
				return res.data.data.disk;
			});
	}
}
