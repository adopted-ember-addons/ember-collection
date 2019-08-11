import ArrayProxy from "@ember/array/proxy";
import $ from "jquery";
import { A } from "@ember/array";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, pauseTest } from "@ember/test-helpers";
import {
  generateContent,
  sortItemsByPosition,
  findItems,
  findVisibleItems,
  findContainer,
  checkContent
} from "../helpers/helpers";
import fixedGridTemplate from "../templates/fixed-grid";
import indexedTemplate from "../templates/indexed";

var nItems = 100;
var itemWidth = 100;
var itemHeight = 40;
var width = 500;
var height = 400;

module("manipulate content", function(hooks) {
  setupRenderingTest(hooks);

  test("replacing the list content", async function(assert) {
    var content = generateContent(nItems);

    this.setProperties({ height, width, itemHeight, itemWidth, content });
    await render(fixedGridTemplate);
    this.set("content", A([{ name: "The only item" }]));

    assert.equal(
      findItems(this).filter(function() {
        return $(this).css("display") !== "none";
      }).length,
      1,
      "The rendered list was updated"
    );

    assert.equal(findItems(this).height(), itemHeight, "The items have the correct height");
    checkContent(this, assert, 0, 1);
  });

  test("adding to the front of the list content", async function(assert) {
    var content = generateContent(nItems);

    this.setProperties({ height, width, itemHeight, itemWidth, content });
    await render(fixedGridTemplate);

    this.set("content", [{ name: "Item -1" }, ...content]);

    var positionSorted = sortItemsByPosition(this, true);

    assert.equal(
      $(positionSorted[0])
        .text()
        .trim(),
      "Item -1",
      "The item has been inserted in the list"
    );

    var expectedRows = Math.ceil((nItems + 1) / (width / itemWidth));
    // console.log("expectedRows", expectedRows);
    // console.log("itemHeight", itemHeight);
    // await pauseTest();

    assert.equal(
      findContainer(this).height(),
      expectedRows * itemHeight,
      "The scrollable view has the correct height"
    );
    checkContent(this, assert, 0, 50);
  });

  test("inserting in the middle of visible content", async function(assert) {
    var content = generateContent(nItems);

    this.setProperties({ height, width, itemHeight, itemWidth, content });
    await render(fixedGridTemplate);

    content.insertAt(2, { name: "Item 2'" });

    var positionSorted = sortItemsByPosition(this);
    assert.equal(
      $(positionSorted[0])
        .text()
        .trim(),
      "Item 1",
      "The item has been inserted in the list"
    );

    assert.equal(
      $(positionSorted[2])
        .text()
        .trim(),
      "Item 2'",
      "The item has been inserted in the list"
    );

    checkContent(this, assert, 0, 50);
  });

  test("clearing the content", async function(assert) {
    var content = generateContent(nItems);

    this.setProperties({ height, width, itemHeight, itemWidth, content });
    await render(fixedGridTemplate);

    content.clear();

    assert.equal(
      findItems(this).filter(function() {
        return $(this).css("display") !== "none";
      }).length,
      0,
      "The rendered list does not contain any elements."
    );
  });

  test("deleting the first element", async function(assert) {
    var content = generateContent(nItems);

    this.setProperties({ height, width, itemHeight, itemWidth, content });
    await render(fixedGridTemplate);

    var positionSorted = sortItemsByPosition(this);

    assert.equal(
      $(positionSorted[0])
        .text()
        .trim(),
      "Item 1",
      "Item 1 has not been removed from the list."
    );

    content.removeAt(0);

    positionSorted = sortItemsByPosition(this);

    assert.equal(
      $(positionSorted[0])
        .text()
        .trim(),
      "Item 2",
      "Item 1 has been remove from the list."
    );
    checkContent(this, assert, 0, 50);
  });

  test("working with an ArrayProxy", async function(assert) {
    var content = ArrayProxy.create({ content: A(generateContent(nItems)) });

    this.setProperties({ height, width, itemHeight, itemWidth, content });
    await render(fixedGridTemplate);

    assert.equal(
      findItems(this).filter(function() {
        return $(this).css("display") !== "none";
      }).length,
      60,
      "The rendered list was updated"
    );

    assert.equal(findItems(this).height(), itemHeight, "The items have the correct height");
    checkContent(this, assert, 0, 50);
  });

  test("indexes update correctly", async function(assert) {
    var content = generateContent(30);
    var filterIndexes = [];

    this.setProperties({
      height,
      width,
      itemHeight,
      itemWidth,
      content,
      filterIndexes
    });
    await render(indexedTemplate);

    this.set("content", [content[1], content[3], content[7], content[13]]);

    assert.equal(
      findVisibleItems(this)
        .text()
        .split(":")
        .sort()
        .join(":"),
      ":0:1:2:3",
      "The indexes updated correctly"
    );

    this.set("content", [content[1], content[3], content[7], content[13], content[27]]);

    assert.equal(
      findVisibleItems(this)
        .text()
        .split(":")
        .sort()
        .join(":"),
      ":0:1:2:3:4",
      "The indexes updated correctly"
    );
  });
});
