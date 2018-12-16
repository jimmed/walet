import { WalColourSchemeBackend } from "../wal";
import { Colour } from '../../colour'
import { ColourScheme } from '../../types'
import * as childProcess from "child_process";

const mockMagickOutput = [
  "# ImageMagick pixel enumeration: 16,1,65535,srgb",
  "0,0: (5959,5695,3947)  #17160F  srgb(23,22,15)",
  "1,0: (10364,6679,4373)  #281A11  srgb(40,26,17)",
  "2,0: (9489,9665,5688)  #252616  srgb(37,38,22)",
  "3,0: (11939,10830,4878)  #2E2A13  srgb(46,42,19)",
  "4,0: (21381,11424,6032)  #532C17  srgb(83,44,23)",
  "5,0: (25389,21741,8163)  #635520  srgb(99,85,32)",
  "6,0: (25920,24564,18257)  #656047  srgb(101,96,71)",
  "7,0: (46545,13863,11951)  #B5362F  srgb(181,54,47)",
  "8,0: (37346,26439,10823)  #91672A  srgb(145,103,42)",
  "9,0: (39881,27925,20542)  #9B6D50  srgb(155,109,80)",
  "10,0: (32721,33648,27220)  #7F836A  srgb(127,131,106)",
  "11,0: (47023,38945,20075)  #B7984E  srgb(183,152,78)",
  "12,0: (43556,38450,24376)  #A9965F  srgb(169,150,95)",
  "13,0: (54218,44977,38685)  #D3AF97  srgb(211,175,151)",
  "14,0: (57320,51588,44974)  #DFC9AF  srgb(223,201,175)",
  "15,0: (52076,51569,49557)  #CBC9C1  srgb(203,201,193)"
];

const mockHexCodes = [
  "#17160F",
  "#281A11",
  "#252616",
  "#2E2A13",
  "#532C17",
  "#635520",
  "#656047",
  "#B5362F",
  "#91672A",
  "#9B6D50",
  "#7F836A",
  "#B7984E",
  "#A9965F",
  "#D3AF97",
  "#DFC9AF",
  "#CBC9C1"
];
const mockRgbValues = [
  { r: 23, g: 22, b: 15 },
  { r: 40, g: 26, b: 17 },
  { r: 37, g: 38, b: 22 },
  { r: 46, g: 42, b : 19 },
  { r: 83, g: 44, b : 23 },
  { r: 99, g: 85, b : 32 },
  { r: 101, g: 96, b : 71 },
  { r: 181, g: 54, b : 47 },
  { r: 145, g: 103, b : 42 },
  { r: 155, g: 109, b : 80 },
  { r: 127, g: 131, b : 106 },
  { r: 183, g: 152, b : 78 },
  { r: 169, g: 150, b : 95 },
  { r: 211, g: 175, b : 151 },
  { r: 223, g: 201, b : 175 },
  { r: 203, g: 201, b : 193 },
];

describe("WalColourSchemeBackend", () => {
  it("should be a function", () => {
    expect(WalColourSchemeBackend).toBeInstanceOf(Function);
  });

  describe("class methods", () => {
    let instance: WalColourSchemeBackend;
    beforeEach(() => {
      instance = new WalColourSchemeBackend();
    });

    describe("parseMagickOutput", () => {
      it("should be a function", () => {
        expect(instance.parseMagickOutput).toBeInstanceOf(Function);
      });

      describe("given a valid input", () => {
        it("should return the colours from the input", () => {
          expect(instance.parseMagickOutput(mockMagickOutput)).toEqual(
            mockHexCodes
          );
        });
      });
    });

    describe('adjustColours', () => {
      let result: Colour[]

      describe('in dark mode', () => {
        beforeEach(() => {
          result = instance.adjustColours(mockHexCodes.map(Colour.fromHex, Colour))
        })

        it('should match the snapshot', () => {
          expect(result).toMatchSnapshot()
        })
      })

      describe('in light mode', () => {
        beforeEach(() => {
          result = instance.adjustColours(mockHexCodes.map(Colour.fromHex, Colour), true)
        })

        it('should match the snapshot', () => {
          expect(result).toMatchSnapshot()
        })
      })
    })

    // FIXME: Need to mock child_process.spawn
    xdescribe("generate", () => {
      let result: ColourScheme;
      beforeEach(async () => {
        const buffer = Buffer.from([1, 2, 3]);
        result = await instance.generate(buffer);
      })

      it("should run `convert` with the right arguments", () => {
        expect(childProcess.spawn).toHaveBeenCalledWith(
          'convert',
          ['-','-size','25%','-colors','16','-unique-colors','txt:-']
        )
      });

      it('should return an array of colours', () => {
        result.colours.forEach(item => expect(item).toBeInstanceOf(Colour))
        expect(result.colours).toMatchSnapshot()
      })
    });
  });
});
