// title      : Base (left) for child cradle
// author     : Anatoliy Oblauhov
// license    : MIT License
// file       : base-left.jscad

// source dimensions
const space = 360; // расстояние между ножками
const pillar = 27; // диаметр ножки
const deep = 12; // высота распорки над базой
const link = 14; // диаметр распорки

// custom dimensions
const base = deep; // толщина базы
const thick = deep; // толщина стенок вокруг ножки
const roof = deep; // толщина над отверстием для распорки
const precision = 100; //количество граней цилиндра
const join = [pillar, 40, link]; // ширина, длина и высота соединения
const screw = [7, 34]; //ширина и длина винта для соединения
const screwhead = [15, 3]; //ширина и толщина головки винта для соединения
const shim = [15, 1]; // ширина и толщина шайбы для соединения
const nut = [12, 5]; //ширина и толщина гайки для соединения

// calculated dimensions
const width = pillar + thick * 2; // длина конструкции
const height = base + deep + link + roof; // высота конструкции

const cyl = (diameter, length, isEnd) => cylinder({
    start: [width / 2, +isEnd * (space + pillar), height - length],
    end: [width / 2, +isEnd * (space + pillar), height],
    fn: precision,
    r1: diameter / 2,
    r2: diameter / 2,
});

const cyls = (diameter, length) => cyl(diameter, length, false);

function main() {
    return cube({size: [width, (space + pillar - join[1]) / 2, height]})
        .union(cyls(width, height))
        .subtract(cube({size: [width, (space - join[1]) / 2 - thick, base]})
            .translate([0, thick + pillar / 2, 0]))
        .subtract(cyls(pillar, deep + link + roof))
        .subtract(cyls(link, width)
            .rotateY(90)
            .translate([width - height, 0, width / 2 + height - link / 2 - roof]))
        .union(cube({size: join})
            .translate([(width - join[0]) / 2, (space + pillar - join[1]) / 2, base + deep]))
        .subtract(cyls(screw[0], height)
            .translate([0, (space + pillar) / 2, 0]));
}
