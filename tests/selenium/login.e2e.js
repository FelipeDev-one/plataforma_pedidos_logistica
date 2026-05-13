const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

async function loginTest() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:3000/login");

    // Esperar inputs
    const emailInput = await driver.wait(
      until.elementLocated(By.css('input[type="email"]')),
      10000
    );

    const passwordInput = await driver.wait(
      until.elementLocated(By.css('input[type="password"]')),
      10000
    );

    await emailInput.sendKeys("cliente@andina.cl");
    await passwordInput.sendKeys("123456");

    // Buscar botón submit
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    // Esperar redirección
    await driver.wait(until.urlContains("/dashboard"), 10000);

    const currentUrl = await driver.getCurrentUrl();
    console.log("✅ Login exitoso. URL actual:", currentUrl);
  } catch (error) {
    console.error("❌ Falló la prueba Selenium:", error);
  } finally {
    await driver.quit();
  }
}

loginTest();