-- -----------------------------------------------------
-- Schema SeuBancoDeDados
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `SeuBancoDeDados` DEFAULT CHARACTER SET utf8 ;
USE `SeuBancoDeDados` ;

-- -----------------------------------------------------
-- Table `SeuBancoDeDados`.`creditor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SeuBancoDeDados`.`creditor` (
  `creditor_id` VARCHAR(100) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`creditor_id`),
  UNIQUE INDEX `creditor_id_UNIQUE` (`creditor_id` ASC),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SeuBancoDeDados`.`debtor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SeuBancoDeDados`.`debtor` (
  `debtor_id` VARCHAR(100) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `cnpj` VARCHAR(14) NOT NULL,
  PRIMARY KEY (`debtor_id`),
  UNIQUE INDEX `debtor_id_UNIQUE` (`debtor_id` ASC),
  UNIQUE INDEX `cnpj_UNIQUE` (`cnpj` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SeuBancoDeDados`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SeuBancoDeDados`.`payment` (
  `payment_id` VARCHAR(100) NOT NULL,
  `creditor_creditor_id` VARCHAR(100) NOT NULL,
  `debtor_debtor_id` VARCHAR(100) NOT NULL,
  `initial_value` FLOAT NOT NULL,
  `final_value` FLOAT NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` VARCHAR(45) NOT NULL,
  `reason` VARCHAR(500) NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE INDEX `payment_id_UNIQUE` (`payment_id` ASC),
  INDEX `fk_payment_creditor_idx` (`creditor_creditor_id` ASC),
  INDEX `fk_payment_debtor1_idx` (`debtor_debtor_id` ASC),
  CONSTRAINT `fk_payment_creditor`
    FOREIGN KEY (`creditor_creditor_id`)
    REFERENCES `SeuBancoDeDados`.`creditor` (`creditor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payment_debtor1`
    FOREIGN KEY (`debtor_debtor_id`)
    REFERENCES `SeuBancoDeDados`.`debtor` (`debtor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
