// title      : Base for child cradle
// author     : Anatoliy Oblauhov
// license    : MIT License
// file       : base-full.jscad

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

var cyls = (r, h) => cyl(0, r, h).union(cyl(1, r, h))

function main() {
    return cube({size: [width, space + pillar, height]})
        .union(cyls(width / 2, height))
        .subtract(cyls(pillar / 2, deep + screw + roof))
        .subtract(cyls(screw / 2, width).union(cyls(link / 2, width / 2))
            .rotateY(90)
            .translate([width - height, 0, width / 2 + height - screw / 2 - roof]))
}