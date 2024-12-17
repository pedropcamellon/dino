/**
 * Target elements classes
 * Crash:
 * .crash-anim-container
 * .crash-anim-animated
 */

import { test, expect } from "@playwright/test";

// const EMAIL = "cosaso9363@lewenbo.com";
const USERNAME = "cosaso9363";
const PASSWORD = "Cosaso9363";

test("play game", async ({ page }) => {
  // Wait for crash
  const crashLocator = page
    .frameLocator('iframe[name="game_iframe"]')
    .locator(".crash-anim-container .animated");

  const betLoaderLocator = page
    .frameLocator('iframe[name="game_iframe"]')
    .getByText("Place Your Bets");

  const btnCashOut = page
    .frameLocator('iframe[name="game_iframe"]')
    .locator(".cashout-button");

  await page.goto("https://mystake.com/en/casino/gamepage?gameid=12489");

  // Login
  console.log("Filling username ...");

  await page
    .locator("form")
    .filter({ hasText: "Log IncloseUsername Password" })
    .getByPlaceholder("Username")
    .fill(USERNAME);

  console.log("Filling password ...");

  await page
    .locator("form")
    .filter({ hasText: "Log IncloseUsername Password" })
    .getByPlaceholder("Password")
    .fill(PASSWORD);

  console.log("Logging in ...");

  await page
    .locator("form")
    .filter({ hasText: "Log IncloseUsername Password" })
    .getByRole("button")
    .click();

  console.log("Turning off sounds ...");

  await page
    .frameLocator('iframe[name="game_iframe"]')
    .locator("#soundOff")
    .click();

  while (true) {
    await page
      .frameLocator('iframe[name="game_iframe"]')
      .getByRole("spinbutton")
      .first()
      .fill("0.20");

    await page
      .frameLocator('iframe[name="game_iframe"]')
      .getByPlaceholder("Coef")
      .first()
      .fill("1.5");

    await betLoaderLocator.waitFor({ state: "visible" });

    // Place bet manually

    // TODO Place bet automatically
    // await page
    //   .frameLocator('iframe[name="game_iframe"]')
    //   .getByRole("button")
    //   .filter({ hasText: "Bet" })
    //   .first()
    //   .click();

    await betLoaderLocator.waitFor({ state: "hidden" });

    // TODO Some waiting...
    // await page.waitForTimeout(3000);

    // let counter = 0;

    // while (true) {
    await crashLocator.waitFor({ state: "visible" });

    // Click on bet button only if crash is visible
    // Bet button
    await page
      .frameLocator('iframe[name="game_iframe"]')
      .getByRole("button", {
        name: "Cashout",
      })
      .click({ force: true });

    // break; // TODO
  }

  //   counter++;

  //   if (counter > 1000) break;
  // }
});
