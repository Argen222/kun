import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Sparkles, Heart, Award, Users } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Кол өнөрчүлүк сапаты",
    description: "Ар бир буюм чеберлер тарабынан ар бир майда-чүйдөсүнө чейин кылдаттык менен жасалат"
  },
  {
    icon: Heart,
    title: "Жеке мамиле",
    description: "Сиздин баалуу эстеликтериңизди окуяңызды баяндаган жаркыраган искусствого айландырабыз"
  },
  {
    icon: Award,
    title: "Премиум материалдар",
    description: "Биз узак мөөнөттүү сапатты жана сулуулукту камсыз кылуу үчүн эң мыкты материалдарды колдонобуз"
  },
  {
    icon: Users,
    title: "Кардар биринчи орунда",
    description: "Ар бир буйрутма үчүн атайын колдоо жана жекече тейлөө кызматы"
  }
];

function AboutPage() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "space-y-20",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6 max-w-3xl mx-auto", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "KUN жөнүндө" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground leading-relaxed", children: "KUN жарыктын уникалдуу түрүн жаратат жана сүрөттөрдү искусствого айландырат. Биз ар бир эстелик жаркырап турууга татыктуу жана ар бир мейкиндик кылдат жасалган жарыктын жылуулугуна муктаж деп ишенебиз." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -50 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              className: "space-y-6",
              children: [
                /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "Биздин тарых" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-muted-foreground leading-relaxed", children: [
                  /* @__PURE__ */ jsx("p", { children: "Жарыкка жана эстеликтерге болгон сүйүү менен негизделген KUN, жарыктандыруу жөн гана жарык бербестен, адамды шыктандырып, сооротуп жана эң баалуу көз ирмемдерди сактап калышы керек деген идеядан жаралган." }),
                  /* @__PURE__ */ jsx("p", { children: "Биздин KUN аталышыбыз күн, жылуулук, жарык жана жайлуулук менен байланыштуу. Күн кантип жашоо жана энергия берсе, биздин буюмдарыбыз да өзү турган ар бир мейкиндикке жылуулук жана өзгөчөлүк тартуулайт." }),
                  /* @__PURE__ */ jsx("p", { children: "Биздин коллекциядагы ар бир буюм кылдаттык менен колго жасалып, премиум материалдар жана инновациялык технологиялар колдонулат. Литофания технологиябыз сүрөттөрүңүздү жарыктанганда жандана турган үч өлчөмдүү искусствого айландырат." })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 50 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              className: "relative aspect-square rounded-2xl overflow-hidden",
              style: {
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 165, 116, 0.1) 100%)",
                boxShadow: "0 8px 32px 0 rgba(212, 165, 116, 0.2)"
              },
              children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center p-12", children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: {
                    boxShadow: [
                      "0 0 60px rgba(255, 179, 71, 0.4)",
                      "0 0 100px rgba(255, 179, 71, 0.6)",
                      "0 0 60px rgba(255, 179, 71, 0.4)"
                    ]
                  },
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  className: "w-full h-full rounded-full bg-gradient-to-br from-accent via-primary to-accent"
                }
              ) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-8", children: features.map((feature, index) => {
          const Icon = feature.icon;
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: index * 0.1 },
              className: "text-center space-y-4",
              children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    whileHover: { scale: 1.1, rotate: 5 },
                    className: "inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20",
                    children: /* @__PURE__ */ jsx(Icon, { className: "w-8 h-8 text-primary" })
                  }
                ),
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: feature.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: feature.description })
              ]
            },
            feature.title
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12 text-center space-y-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "Биздин миссия" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed", children: "Жарыктандыруу жана литофания аркылуу ар бир үйгө жылуулук, сулуулук жана жекечелик алып келүү. Биз сиздин эң баалуу эстеликтериңизди күн сайын ырахаттана турган формада сактап калууга, өмүр бою сакталып кала турган жайлуулук жана ностальгия атмосферасын түзүүгө милдеттүүбүз." })
        ] })
      ]
    }
  ) }) });
}
export {
  AboutPage
};