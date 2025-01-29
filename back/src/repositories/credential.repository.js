"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialRepository = void 0;
const dataSource_1 = require("../config/dataSource");
const Credential_1 = require("../entities/Credential");
exports.CredentialRepository = dataSource_1.AppDataSource.getRepository(Credential_1.Credential);
