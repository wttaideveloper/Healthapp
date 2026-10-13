// Run with: node --test src/components/utils/pdfBranding.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { PDFDocument } from "pdf-lib";
import { brandTemplatePdf, stripDataUrlPrefix } from "./pdfBranding.ts";

// 1x1 transparent PNG
const PNG_B64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

const makeTemplate = async (): Promise<Uint8Array> => {
  const doc = await PDFDocument.create();
  doc.addPage([595, 842]);
  return doc.save();
};

test("applies logo and contact line to a valid template", async () => {
  const result = await brandTemplatePdf(await makeTemplate(), {
    logo: PNG_B64,
    address: "1 Main St, Town",
    phoneNumber: "555-0100",
  });
  assert.equal(result.logoFailed, false);
  assert.equal(result.contactCharsDropped, false);
  const out = await PDFDocument.load(result.bytes);
  assert.equal(out.getPageCount(), 1);
});

test("accepts raw PNG bytes", async () => {
  const bytes = Uint8Array.from(Buffer.from(PNG_B64, "base64"));
  const result = await brandTemplatePdf(await makeTemplate(), { logo: bytes });
  assert.equal(result.logoFailed, false);
});

test("reports an invalid logo instead of silently ignoring it", async () => {
  const result = await brandTemplatePdf(await makeTemplate(), {
    logo: Buffer.from("this is not an image").toString("base64"),
    phoneNumber: "555-0100",
  });
  assert.equal(result.logoFailed, true);
  // The rest of the PDF is still produced.
  const out = await PDFDocument.load(result.bytes);
  assert.equal(out.getPageCount(), 1);
});

test("reports contact characters the built-in font cannot print", async () => {
  const result = await brandTemplatePdf(await makeTemplate(), {
    address: "12 मुख्य मार्ग",
    phoneNumber: "555-0100",
  });
  assert.equal(result.contactCharsDropped, true);
  await PDFDocument.load(result.bytes);
});

test("works with no branding at all", async () => {
  const result = await brandTemplatePdf(await makeTemplate(), {});
  assert.equal(result.logoFailed, false);
  assert.equal(result.contactCharsDropped, false);
});

test("rejects a corrupt template", async () => {
  await assert.rejects(() => brandTemplatePdf(new Uint8Array([1, 2, 3]), {}));
});

test("stripDataUrlPrefix", () => {
  assert.equal(stripDataUrlPrefix("data:image/png;base64,AAAA"), "AAAA");
  assert.equal(stripDataUrlPrefix("AAAA"), "AAAA");
});
