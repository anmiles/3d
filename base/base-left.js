// title      : Base (left) for child cradle
// author     : Anatoliy Oblauhov
// license    : MIT License
// file       : base-left.jscad

// source dimensions
var space = 360; // расстояние между ножками
var pillar = 28; // диаметр ножки
var deep = 11; // высота распорки над базой
var link = 13; // диаметр распорки
var screw = 11; // диаметр винта распорки

// custom dimensions
var base = 11; // толщина базы
var thick = 11; // толщина стенок вокруг ножки
var roof = 11; // толщина над отверстием для распорки
var pin = 120; // длина шпильки
var thread = 8; // диаметр резьбы

// calculated dimensions
var width = pillar + thick * 2;
var height = base + deep + screw + roof;

var cyl = (isEnd, r, h) => cylinder({
    start: [width / 2, +isEnd * (space + pillar), height - h],
    end: [width / 2, +isEnd * (space + pillar), height],
    fn: 100,
    r1: r,
    r2: r,
});

var cyls = (r, h) => cyl(0, r, h);

function main() {
    return cube({size: [width, (space + pillar) / 2, height]})
        .union(cyls(width / 2, height))
        .subtract(cube({size: [width, space / 2 - thick, base]})
            .translate([0, thick + pillar / 2, 0]))
        .subtract(cyls(pillar / 2, deep + screw + roof))
        .subtract(cyls(screw / 2, width).union(cyls(link / 2, width / 2))
            .rotateY(90)
            .translate([width - height, 0, width / 2 + height - screw / 2 - roof]))
        .subtract(cyls(thread / 2, pin / 2)
            .rotateX(90)
            .translate([0, height + (space + pillar - pin) / 2, (height + base) / 2]))
}
