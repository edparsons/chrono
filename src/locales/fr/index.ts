import { includeCommonConfiguration } from "../../configurations";
import { ParsedResult, ParsingOption } from "../../index";
import { Chrono, Configuration } from "../../chrono";
import FRCasualDateParser from "./parsers/FRCasualDateParser";
import FRCasualTimeParser from "./parsers/FRCasualTimeParser";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import FRTimeExpressionParser from "./parsers/FRTimeExpressionParser";
import FRMergeDateTimeRefiner from "./refiners/FRMergeDateTimeRefiner";
import FRMergeDateRangeRefiner from "./refiners/FRMergeDateRangeRefiner";

// Shortcuts
export const casual = new Chrono(createCasualConfiguration());
export const strict = new Chrono(createConfiguration(true));

export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}

export function createCasualConfiguration(littleEndian = true): Configuration {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(new FRCasualDateParser());
    option.parsers.unshift(new FRCasualTimeParser());
    return option;
}

export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [new SlashDateFormatParser(littleEndian), new FRTimeExpressionParser()],
            refiners: [new FRMergeDateTimeRefiner(), new FRMergeDateRangeRefiner()],
        },
        strictMode
    );
}
