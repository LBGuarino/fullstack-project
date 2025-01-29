"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPasswordService = exports.createCredentialService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const credential_repository_1 = require("../repositories/credential.repository");
// ...
const createCredentialService = (credentialDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = credentialDto;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const credential = credential_repository_1.CredentialRepository.create({ password: hashedPassword });
    yield credential_repository_1.CredentialRepository.save(credential);
    return credential;
});
exports.createCredentialService = createCredentialService;
const checkPasswordService = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compare(password, hashedPassword);
});
exports.checkPasswordService = checkPasswordService;
