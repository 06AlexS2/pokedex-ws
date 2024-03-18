-- CreateTable
CREATE TABLE "pokemon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "element_types" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pokemon_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokemon_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    CONSTRAINT "pokemon_types_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pokemon_types_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "element_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "damage_classes" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "moves" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "pp" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "chance" INTEGER NOT NULL,
    "short_effect" TEXT NOT NULL,
    "damage_class_id" INTEGER NOT NULL,
    CONSTRAINT "moves_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "element_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "moves_damage_class_id_fkey" FOREIGN KEY ("damage_class_id") REFERENCES "damage_classes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pokemon_moves" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokemon_id" INTEGER NOT NULL,
    "move_id" INTEGER NOT NULL,
    CONSTRAINT "pokemon_moves_move_id_fkey" FOREIGN KEY ("move_id") REFERENCES "moves" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pokemon_moves_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_id_key" ON "pokemon"("id");

-- CreateIndex
CREATE UNIQUE INDEX "element_types_id_key" ON "element_types"("id");

-- CreateIndex
CREATE UNIQUE INDEX "damage_classes_id_key" ON "damage_classes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "moves_id_key" ON "moves"("id");
