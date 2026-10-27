#!/usr/bin/env python3
"""Build CPAD Assignments 1–10 report (PDF) and presentation (PPTX) for ARCHIVE."""

from __future__ import annotations

from pathlib import Path

from PIL import Image as PILImage
from pptx import Presentation
from pptx.dml.color import RGBColor as RgbColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
from pptx.util import Inches, Pt
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch, mm
from reportlab.platypus import (
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

# KeepTogether is used so figure captions never orphan onto a blank following page.

ROOT = Path(__file__).resolve().parent
SHOTS = ROOT / "screenshots"
OUT_PDF = ROOT / "Tanmay_Shinde_CPAD_Assignments_1-10_ARCHIVE_Report.pdf"
OUT_PPTX = ROOT / "Tanmay_Shinde_CPAD_Assignments_1-10_ARCHIVE_Presentation.pptx"

STUDENT = {
    "name": "Tanmay Shinde",
    "enrollment": "ADT23SOCB1617",
    "roll": "12",
    "division": "LY-SMAD",
    "program": "B.Tech Information Technology",
    "year": "Final Year (LY)",
    "faculty": "Prof. Rohini Bhosale",
    "ay": "2026–27",
    "date": "23 October 2026",
    "university": "MIT ART, DESIGN AND TECHNOLOGY UNIVERSITY",
    "school": "MIT School of Computing, Pune",
    "dept": "Department of Information Technology",
    "course": "Cross Platform App Development (CPAD)",
    "project": "ARCHIVE",
}

BONE = colors.HexColor("#f2eee6")
INK = colors.HexColor("#181510")
CLAY = colors.HexColor("#a9522f")
STONE = colors.HexColor("#c9c0b4")
MUTED = colors.HexColor("#5c5648")

PAGE_W, PAGE_H = A4


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    text = f"{STUDENT['name']}  |  CPAD Assignments 1–10  |  Page {doc.page}"
    canvas.drawCentredString(PAGE_W / 2, 12 * mm, text)
    canvas.setStrokeColor(STONE)
    canvas.setLineWidth(0.4)
    canvas.line(20 * mm, 16 * mm, PAGE_W - 20 * mm, 16 * mm)
    canvas.restoreState()


def styles():
    base = getSampleStyleSheet()
    s = {
        "title": ParagraphStyle(
            "TitleBig",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=18,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=6,
        ),
        "uni": ParagraphStyle(
            "Uni",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=11,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "sub": ParagraphStyle(
            "Sub",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=14,
            textColor=INK,
            spaceBefore=10,
            spaceAfter=8,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12,
            textColor=CLAY,
            spaceBefore=8,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "BodyJust",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=INK,
            alignment=TA_JUSTIFY,
            spaceAfter=6,
        ),
        "caption": ParagraphStyle(
            "Cap",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=9,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceBefore=4,
            spaceAfter=10,
        ),
        "bullet": ParagraphStyle(
            "BulletBody",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=13,
            textColor=INK,
        ),
        "toc": ParagraphStyle(
            "TOC",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=16,
            textColor=INK,
        ),
    }
    return s


def shot(name: str, max_w: float = 2.35 * inch, max_h: float = 4.6 * inch) -> Image | None:
    path = SHOTS / f"{name}.png"
    if not path.exists():
        return None
    with PILImage.open(path) as im:
        w, h = im.size
    scale = min(max_w / w, max_h / h)
    return Image(str(path), width=w * scale, height=h * scale)


def fig_parts(name: str, caption: str, s, max_w=2.4 * inch, max_h=4.6 * inch):
    img = shot(name, max_w=max_w, max_h=max_h)
    if img is None:
        return [Paragraph(f"[Screenshot missing: {name}]", s["caption"])]
    return [img, Paragraph(caption, s["caption"])]


def fig(name: str, caption: str, s, max_w=2.4 * inch, max_h=4.6 * inch):
    return KeepTogether(fig_parts(name, caption, s, max_w=max_w, max_h=max_h))


def two_figs(a, ca, b, cb, s, max_w=2.55 * inch, max_h=4.2 * inch):
    left = fig_parts(a, ca, s, max_w=max_w, max_h=max_h)
    right = fig_parts(b, cb, s, max_w=max_w, max_h=max_h)
    t = Table([[left, right]], colWidths=[3.3 * inch, 3.3 * inch])
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return KeepTogether([t])


def kv_table(rows, col_widths=None):
    data = [[Paragraph(f"<b>{k}</b>", ParagraphStyle("k", fontSize=9, textColor=INK)), Paragraph(v, ParagraphStyle("v", fontSize=9, textColor=INK))] for k, v in rows]
    t = Table(data, colWidths=col_widths or [1.8 * inch, 4.7 * inch])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), BONE),
                ("BOX", (0, 0), (-1, -1), 0.5, STONE),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, STONE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def bullets(items, s):
    return ListFlowable(
        [ListItem(Paragraph(i, s["bullet"]), leftIndent=8, value="•") for i in items],
        bulletType="bullet",
        start="•",
        leftIndent=12,
        spaceBefore=2,
        spaceAfter=6,
    )


def build_pdf():
    s = styles()
    doc = SimpleDocTemplate(
        str(OUT_PDF),
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=18 * mm,
        bottomMargin=22 * mm,
        title=f"CPAD Assignments 1–10 — {STUDENT['project']}",
        author=STUDENT["name"],
    )
    story = []

    # Cover
    story += [
        Spacer(1, 18 * mm),
        Paragraph(STUDENT["university"], s["uni"]),
        Paragraph(STUDENT["school"], s["sub"]),
        Paragraph(STUDENT["dept"], s["sub"]),
        Spacer(1, 8 * mm),
        Paragraph(f"Course: {STUDENT['course']}", s["sub"]),
        Spacer(1, 10 * mm),
        Paragraph("ASSIGNMENT REPORT", s["title"]),
        Paragraph("Assignments 1 to 10", s["uni"]),
        Paragraph(f"<b>{STUDENT['project']}</b> — Expo / React Native marketplace", s["sub"]),
        Spacer(1, 12 * mm),
        kv_table(
            [
                ("Student Name", STUDENT["name"]),
                ("Enrollment Number", STUDENT["enrollment"]),
                ("Roll No. / Division", f"{STUDENT['roll']}  /  {STUDENT['division']}"),
                ("Program", STUDENT["program"]),
                ("Year", STUDENT["year"]),
                ("Course Faculty", STUDENT["faculty"]),
                ("Academic Year", STUDENT["ay"]),
                ("Date of Submission", STUDENT["date"]),
            ]
        ),
        PageBreak(),
    ]

    # Declaration
    story += [
        Paragraph("Declaration", s["h1"]),
        Paragraph(
            f"I, {STUDENT['name']}, a student of {STUDENT['program']} "
            f"(Enrollment No. {STUDENT['enrollment']}, Roll No. {STUDENT['roll']}, "
            f"Division {STUDENT['division']}), declare that this report and the accompanying "
            f"project, {STUDENT['project']}, are my own work, completed for Assignments 1 to 10 "
            f"of the {STUDENT['course']} course. The application was built with Expo (SDK 58), "
            f"React Native and TypeScript, and executed on the Pixel_9 Android emulator. "
            f"Screenshots in this report illustrate the running ARCHIVE storefront UI.",
            s["body"],
        ),
        Spacer(1, 8 * mm),
        Paragraph(f"Student Name: {STUDENT['name']}", s["body"]),
        Paragraph(f"Enrollment Number: {STUDENT['enrollment']}", s["body"]),
        Paragraph(f"Date: {STUDENT['date']}", s["body"]),
        Paragraph("Signature: ______________________", s["body"]),
        PageBreak(),
    ]

    # TOC (section titles only — page numbers shift with figures)
    story += [
        Paragraph("Table of Contents", s["h1"]),
        Paragraph("1. Introduction and Project Overview", s["toc"]),
        Paragraph("2. Assignment 1: Setup and Hello ARCHIVE", s["toc"]),
        Paragraph("3. Assignment 2: Native vs Hybrid vs React Native", s["toc"]),
        Paragraph("4. Assignment 3: Components, Props and useState", s["toc"]),
        Paragraph("5. Assignment 4: Folder Structure and Reuse", s["toc"]),
        Paragraph("6. Assignment 5: Customer Profile with Core Components", s["toc"]),
        Paragraph("7. Assignment 6: Flexbox, TextInput, Events + Auth screens", s["toc"]),
        Paragraph("8. Assignment 7: Multi-Screen Navigation", s["toc"]),
        Paragraph("9. Assignment 8: Dynamic Data (JSON + Public API)", s["toc"]),
        Paragraph("10. Assignment 9: E-Commerce Storefront", s["toc"]),
        Paragraph("11. Assignment 10: Complete Shopping Application", s["toc"]),
        Paragraph("12. Rubric Alignment", s["toc"]),
        Paragraph("13. Conclusion", s["toc"]),
        PageBreak(),
    ]

    # 1 Intro
    story += [
        Paragraph("1. Introduction and Project Overview", s["h1"]),
        Paragraph(
            "This report documents Assignments 1 to 10 of the CPAD course. Instead of ten "
            "unrelated demos, every requirement is implemented inside one product: <b>ARCHIVE</b>, "
            "a curated vintage and pre-loved fashion marketplace for Android. The app covers "
            "boot screen, comparative study, reusable components, profile, forms, stack + tab "
            "navigation, local catalogue FlatList, public API feed, storefront pages, cart, "
            "checkout and order confirmation.",
            s["body"],
        ),
        Paragraph("1.1 Technology used", s["h2"]),
        kv_table(
            [
                ("Framework", "Expo SDK 58 · React Native 0.88 · TypeScript"),
                ("Project creation", "Expo (Continuous Native Generation; android/ via prebuild)"),
                ("Run target", "Pixel_9 Android emulator"),
                ("Navigation", "React Navigation — native stack + bottom tabs"),
                ("State", "Context + useReducer · AsyncStorage persistence"),
                ("Images / motion", "expo-image · react-native-reanimated"),
            ]
        ),
        Spacer(1, 4 * mm),
        Paragraph("1.2 Assignment mapping", s["h2"]),
        kv_table(
            [
                ("1 Setup + Hello", "HelloArchiveScreen, Expo project, Pixel_9 run"),
                ("2 Comparative study", "TechInsights (How we build) + docs write-up"),
                ("3 Props & useState", "ProductCard, QuantityStepper, FilterChip, wishlist"),
                ("4 Structure & reuse", "Documented src/ tree + shared UI kit"),
                ("5 Profile + cores", "CustomerProfileScreen: View/Text/Image/TextInput/Button/Switch/ScrollView"),
                ("6 Flexbox + events", "Login/Register + Checkout/Contact TextInputs & Alerts"),
                ("7 Stack navigation", "RootNavigator + MainTabs"),
                ("8 Dynamic data", "products.json FlatList + FakeStore API Discover more"),
                ("9 Storefront", "Home, About, Authenticity, Catalogue, Contact"),
                ("10 Shopping app", "Auth-gated checkout · Product → Cart → Order"),
            ],
            col_widths=[1.7 * inch, 4.8 * inch],
        ),
        PageBreak(),
    ]

    # A1
    story += [
        Paragraph("2. Assignment 1: Setup and Hello ARCHIVE", s["h1"]),
        Paragraph("2.1 Aim", s["h2"]),
        Paragraph(
            "To show that ARCHIVE is a real Expo / React Native application that installs and runs on the Android emulator.",
            s["body"],
        ),
        Paragraph("2.2 Steps performed", s["h2"]),
        bullets(
            [
                "Create the Expo TypeScript project (SDK 58) with package name com.archive.marketplace.",
                "Configure app.json splash, icon, fonts (Fraunces + DM Sans) and expo-image.",
                "Generate the Android project with Expo prebuild / expo run:android.",
                "Run on Pixel_9; first screen is Hello ARCHIVE, then Enter the Archive opens MainTabs.",
            ],
            s,
        ),
        Paragraph("2.3 Explanation", s["h2"]),
        Paragraph(
            "Expo provides the managed toolchain while still producing a native Android build. "
            "Metro bundles TypeScript; Gradle installs the APK on Pixel_9. The Hello ARCHIVE "
            "boot screen is the living first milestone of Assignment 1.",
            s["body"],
        ),
        Paragraph("2.4 Output", s["h2"]),
        fig("01_hello", "Figure 1: Hello ARCHIVE boot screen (Assignment 1)", s, max_w=2.2 * inch),
        PageBreak(),
    ]

    # A2
    story += [
        Paragraph("3. Assignment 2: Native vs Hybrid vs React Native", s["h1"]),
        Paragraph("3.1 Aim", s["h2"]),
        Paragraph(
            "To compare three approaches for the same product goal and justify React Native (Expo) for ARCHIVE.",
            s["body"],
        ),
        Paragraph("3.2 Comparison", s["h2"]),
        kv_table(
            [
                ("Native", "Kotlin/Swift + SDKs — best performance; two codebases"),
                ("Hybrid", "HTML/CSS/JS in WebView — fast web reuse; weaker native feel"),
                ("React Native", "TypeScript → native views — one UI codebase, Metro Fast Refresh"),
            ]
        ),
        Paragraph("3.3 Why React Native for ARCHIVE", s["h2"]),
        bullets(
            [
                "Curriculum fit: Props, useState, Flexbox, Stack, FlatList, fetch.",
                "Catalogue performance via FlatList virtualisation.",
                "Shared TypeScript for storefront + shopping flows.",
                "Offline cart with AsyncStorage without shipping two native apps.",
            ],
            s,
        ),
        Paragraph("3.4 Output", s["h2"]),
        fig("10_tech", "Figure 2: How we build ARCHIVE — comparative study screen (Assignment 2)", s, max_w=2.2 * inch),
        PageBreak(),
    ]

    # A3
    story += [
        Paragraph("4. Assignment 3: Components, Props and useState", s["h1"]),
        Paragraph("4.1 Aim", s["h2"]),
        Paragraph(
            "To build reusable components driven by Props, and a dynamic UI from state rather than rewritten markup.",
            s["body"],
        ),
        Paragraph("4.2 Reusable components", s["h2"]),
        kv_table(
            [
                ("ProductCard", "Props: product, onPress, width — image, badge, wishlist heart"),
                ("QuantityStepper", "Controlled quantity with useState callbacks"),
                ("FilterChip", "Catalogue category filters"),
                ("PriceTag / Badge / Button", "Shared presentational UI kit"),
            ]
        ),
        Paragraph("4.3 State-driven UI", s["h2"]),
        Paragraph(
            "Wishlist heart toggles via WishlistContext; cart quantity updates CartContext; "
            "catalogue search/sort live in useState inside CatalogueScreen.",
            s["body"],
        ),
        two_figs(
            "03_catalogue",
            "Figure 3: Catalogue cards from ProductCard props",
            "04_product",
            "Figure 4: Product details — size state + wishlist",
            s,
        ),
        PageBreak(),
    ]

    # A4 — keep theory + folder screenshot on a single page (no orphan caption page)
    story += [
        KeepTogether(
            [
                Paragraph("5. Assignment 4: Folder Structure and Reuse", s["h1"]),
                Paragraph("5.1 Aim", s["h2"]),
                Paragraph(
                    "To organise the project so each folder matches a course concept, with shared components reused across screens.",
                    s["body"],
                ),
                Paragraph("5.2 Documented folder structure", s["h2"]),
                kv_table(
                    [
                        ("App.tsx", "Providers + RootNavigator entry"),
                        ("src/screens/", "Feature screens incl. Login / Register"),
                        ("src/components/", "ui/ kit + product/ProductCard"),
                        ("src/context/", "Auth, Cart, Wishlist, Profile, Orders"),
                        ("src/navigation/", "RootNavigator (stack) + MainTabs"),
                        ("src/data/ + services/", "JSON catalogue, API, AsyncStorage"),
                        ("docs/", "Academic write-ups and this submission"),
                    ]
                ),
                Paragraph("5.3 State in the application", s["h2"]),
                bullets(
                    [
                        "AuthContext — local register/login session (required for checkout).",
                        "CartContext + useReducer with AsyncStorage persistence.",
                        "WishlistContext and ProfileContext sync after sign-in.",
                    ],
                    s,
                ),
                fig(
                    "14_folder",
                    "Figure 5: ARCHIVE folder structure (Assignment 4)",
                    s,
                    max_w=5.2 * inch,
                    max_h=2.65 * inch,
                ),
            ]
        ),
        PageBreak(),
    ]

    # A5
    story += [
        Paragraph("6. Assignment 5: Customer Profile with Core Components", s["h1"]),
        Paragraph("6.1 Aim", s["h2"]),
        Paragraph(
            "To implement a customer profile screen using the core React Native components required by the brief.",
            s["body"],
        ),
        Paragraph("6.2 Core components used", s["h2"]),
        kv_table(
            [
                ("View", "Layout sections and navigation cards"),
                ("Text", "Name, labels, group titles"),
                ("Image", "Default profile avatar"),
                ("TextInput", "Name, email, phone, address, city, PIN"),
                ("Button", "Edit / Save profile (React Native Button)"),
                ("Switch", "Order notifications and newsletter"),
                ("ScrollView", "Full profile scroll container"),
                ("StyleSheet", "Bone/ink/clay theme tokens"),
            ]
        ),
        Paragraph("6.3 Navigation list", s["h2"]),
        Paragraph(
            "Below the form, a settings-style navigation list pushes stack screens (Wishlist, "
            "Orders, Discover more, How we build, etc.) without cluttering the UI with raw buttons. "
            "Guests see Sign in / Create account; signed-in members see their account details.",
            s["body"],
        ),
        fig("07_profile", "Figure 6: Customer Profile — core components + nav list (Assignment 5)", s, max_w=2.2 * inch),
        PageBreak(),
    ]

    # A6 — login/register screenshots are the primary figures for this section
    story += [
        Paragraph("7. Assignment 6: Flexbox, TextInput and Events", s["h1"]),
        Paragraph("7.1 Flexbox layouts", s["h2"]),
        bullets(
            [
                "Home quick actions and catalogue chips use flexWrap rows.",
                "Product size chips and cart lines use Flexbox rows with steppers.",
                "useWindowDimensions drives product gallery width and card columns.",
            ],
            s,
        ),
        Paragraph("7.2 Controlled inputs and onPress", s["h2"]),
        bullets(
            [
                "Login / Create account forms use controlled TextInput + validation Alerts.",
                "Checkout and Contact keep TextInput values in useState.",
                "Add to cart, wishlist, and Place order use Pressable/Button onPress handlers.",
            ],
            s,
        ),
        Paragraph("7.3 Sign in & create account (primary screenshots)", s["h2"]),
        Paragraph(
            "Guests may browse and add items to the cart. Placing an order requires a registered "
            "account. LoginScreen and RegisterScreen demonstrate TextInput, onPress validation, "
            "and navigation into Checkout after a successful session.",
            s["body"],
        ),
        two_figs(
            "12_login",
            "Figure 7: Sign in screen (Assignment 6)",
            "13_register",
            "Figure 8: Create account screen (Assignment 6)",
            s,
            max_w=2.7 * inch,
            max_h=4.35 * inch,
        ),
        PageBreak(),
        Paragraph("7.4 Checkout & cart (supporting screenshots)", s["h2"]),
        two_figs(
            "06_checkout",
            "Figure 9: Checkout form — controlled inputs",
            "05_cart",
            "Figure 10: Cart — Flexbox rows + QuantityStepper",
            s,
            max_w=2.5 * inch,
            max_h=4.0 * inch,
        ),
        PageBreak(),
    ]

    # A7
    story += [
        Paragraph("8. Assignment 7: Multi-Screen Navigation", s["h1"]),
        Paragraph("7.1 / 8.1 Aim", s["h2"]),
        Paragraph(
            "To demonstrate multi-screen navigation with a mandatory Stack navigator and storefront chrome via bottom tabs.",
            s["body"],
        ),
        Paragraph("8.2 Implementation", s["h2"]),
        kv_table(
            [
                ("RootNavigator", "Native stack: Hello, Product, Checkout, About, Discover, …"),
                ("MainTabs", "Bottom tabs: Home · Shop · Cart · Profile"),
                ("Typed params", "RootStackParamList / MainTabParamList (TypeScript)"),
            ]
        ),
        Paragraph(
            "Typical path: Home → Catalogue → Product Details → Cart → Checkout → Order Confirmation. "
            "Profile list items navigate into the same stack.",
            s["body"],
        ),
        fig("11_tabs", "Figure 11: Bottom tab navigation bar (Assignment 7)", s, max_w=2.2 * inch),
        PageBreak(),
    ]

    # A8
    story += [
        Paragraph("9. Assignment 8: Dynamic Data (JSON + Public API)", s["h1"]),
        Paragraph("9.1 Local JSON FlatList", s["h2"]),
        Paragraph(
            "CatalogueScreen reads src/data/products.json (26 authenticated pieces, INR). "
            "FlatList uses numColumns, getItemLayout hints and FilterChip/search/sort for efficiency.",
            s["body"],
        ),
        Paragraph("9.2 Public API demo", s["h2"]),
        Paragraph(
            "Discover more (ApiDemoScreen) fetches https://fakestoreapi.com/products with loading, "
            "error, retry and pull-to-refresh. Images are URI-encoded for Android.",
            s["body"],
        ),
        two_figs(
            "03_catalogue",
            "Figure 12: Local JSON catalogue FlatList",
            "08_discover",
            "Figure 13: Public API partner feed",
            s,
        ),
        PageBreak(),
    ]

    # A9
    story += [
        Paragraph("10. Assignment 9: E-Commerce Storefront", s["h1"]),
        Paragraph(
            "Assignment 9 requires a brand storefront. ARCHIVE delivers Home (hero + story), "
            "About, Authenticity & Services, Catalogue and Contact, linked through the stack navigator.",
            s["body"],
        ),
        two_figs(
            "02_home",
            "Figure 14: Home — brand hero and edit",
            "09_about",
            "Figure 15: About ARCHIVE",
            s,
        ),
        PageBreak(),
    ]

    # A10
    story += [
        Paragraph("11. Assignment 10: Complete Shopping Application", s["h1"]),
        Paragraph(
            "Assignment 10 is a strict superset of Assignment 9. ARCHIVE adds Product Details, "
            "Cart, auth-gated Checkout with validation, Customer Profile, search/filter/sort, "
            "wishlist and order confirmation — one Expo app, one stack.",
            s["body"],
        ),
        bullets(
            [
                "Product gallery, size selection, authenticity badge, add to cart.",
                "Cart persistence via AsyncStorage; quantity stepper; remove with Alert.",
                "Sign in / Create account required before Place order.",
                "Checkout validation → OrderConfirmation with generated order id.",
                "Profile + Preferences switches; account navigation list.",
            ],
            s,
        ),
        two_figs(
            "04_product",
            "Figure 16: Product → Add to cart",
            "05_cart",
            "Figure 17: Cart → Checkout path",
            s,
        ),
        PageBreak(),
    ]

    # Rubric
    story += [
        Paragraph("12. Rubric Alignment", s["h1"]),
        Paragraph("The table below states where each evaluation criterion is demonstrated.", s["body"]),
        kv_table(
            [
                (
                    "Functionality & Output",
                    "All screens navigable on Pixel_9; cart/checkout/API loading-error-retry; empty states.",
                ),
                (
                    "Code Structure & Syntax",
                    "TypeScript strict, modular src/, ESLint/Prettier, typed navigators.",
                ),
                (
                    "Concept Implementation",
                    "Props, useState/Context, core components, Flexbox, Stack+Tabs, FlatList, fetch, Alerts.",
                ),
                (
                    "Readability & Documentation",
                    "README, docs/ASSIGNMENT_*.md, this report + presentation with screenshots.",
                ),
                (
                    "Viva / Explanation",
                    "docs/VIVA_NOTES.md + How we build screen for comparative study.",
                ),
            ]
        ),
        PageBreak(),
    ]

    # Conclusion
    story += [
        Paragraph("13. Conclusion", s["h1"]),
        Paragraph(
            "Assignments 1 to 10 were completed as a single Expo React Native application — ARCHIVE — "
            "run on the Pixel_9 emulator. The project covers setup, comparative study, reusable "
            "components with Props and state, documented structure, core profile components, "
            "Flexbox and validated forms, stack + tab navigation, local JSON and public API lists, "
            "and a full shopping flow from catalogue to order confirmation. One idea summarises the "
            "design: a premium storefront UI that still maps cleanly onto every CPAD requirement.",
            s["body"],
        ),
        Spacer(1, 8 * mm),
        Paragraph(f"Submitted by: {STUDENT['name']}", s["body"]),
        Paragraph(f"Enrollment Number: {STUDENT['enrollment']}", s["body"]),
        Paragraph(f"Project: {STUDENT['project']} (https://github.com/tanmays0/ARCHIVE-APP)", s["body"]),
    ]

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print("PDF →", OUT_PDF)


# ---------- PPTX ----------

BRAND_HEX = {
    "bone": "F2EEE6",
    "ink": "181510",
    "clay": "A9522F",
    "muted": "5C5648",
    "stone": "C9C0B4",
    "card": "F6F2EA",
}


def rgb(hex6: str) -> RgbColor:
    return RgbColor.from_string(hex6)


def set_slide_bg(slide, hex6: str):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = rgb(hex6)


def add_text(box, text, size=18, bold=False, color="181510", align=PP_ALIGN.LEFT):
    tf = box.text_frame
    tf.clear()
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = rgb(color)
    run.font.name = "Calibri"
    return tf


def add_para(tf, text, size=14, bold=False, color="181510", space_before=6):
    p = tf.add_paragraph()
    p.space_before = Pt(space_before)
    run = p.add_run()
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = rgb(color)
    run.font.name = "Calibri"
    return p


def add_picture_safe(slide, name, left, top, height=Inches(4.8)):
    path = SHOTS / f"{name}.png"
    if path.exists():
        slide.shapes.add_picture(str(path), left, top, height=height)


def accent_bar(slide, left=Inches(0.6), top=Inches(1.0)):
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, Inches(1.2), Inches(0.06))
    bar.fill.solid()
    bar.fill.fore_color.rgb = rgb(BRAND_HEX["clay"])
    bar.line.fill.background()


def section_title(slide, text, subtitle=None):
    h = slide.shapes.add_textbox(Inches(0.6), Inches(0.32), Inches(12), Inches(0.55))
    add_text(h, text, size=26, bold=True)
    accent_bar(slide)
    if subtitle:
        s = slide.shapes.add_textbox(Inches(0.6), Inches(1.15), Inches(12), Inches(0.4))
        add_text(s, subtitle, size=14, color=BRAND_HEX["muted"])


def bullets_box(slide, lines, left, top, width, height, size=17):
    body = slide.shapes.add_textbox(left, top, width, height)
    tf = add_text(body, f"•  {lines[0]}", size=size)
    for b in lines[1:]:
        add_para(tf, f"•  {b}", size=size, space_before=12)
    return tf


def add_table(slide, rows, left, top, width, height, col_widths):
    table = slide.shapes.add_table(len(rows), len(rows[0]), left, top, width, height).table
    for i, w in enumerate(col_widths):
        table.columns[i].width = w
    for r, row in enumerate(rows):
        for c, val in enumerate(row):
            cell = table.cell(r, c)
            cell.text = val
            for p in cell.text_frame.paragraphs:
                for run in p.runs:
                    run.font.size = Pt(11 if r else 12)
                    run.font.bold = r == 0
                    run.font.color.rgb = rgb("F2EEE6" if r == 0 else "181510")
                    run.font.name = "Calibri"
            cell.fill.solid()
            cell.fill.fore_color.rgb = rgb(
                BRAND_HEX["ink"] if r == 0 else ("F6F2EA" if r % 2 == 0 else "F2EEE6")
            )
    return table


def build_pptx():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank = prs.slide_layouts[6]

    # —— 1 Title ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["ink"])
    t = slide.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(11.5), Inches(1))
    add_text(t, "ARCHIVE", size=52, bold=True, color="F2EEE6", align=PP_ALIGN.CENTER)
    sub = slide.shapes.add_textbox(Inches(0.8), Inches(2.6), Inches(11.5), Inches(2.2))
    tf = add_text(
        sub,
        "Curated vintage marketplace for Android",
        size=24,
        color="A9522F",
        align=PP_ALIGN.CENTER,
    )
    add_para(tf, "Expo SDK 58 · React Native · TypeScript · INR storefront", size=16, color="C9C0B4", space_before=10)
    add_para(
        tf,
        f"{STUDENT['name']}  ·  {STUDENT['enrollment']}  ·  Roll {STUDENT['roll']} / {STUDENT['division']}",
        size=14,
        color="C9C0B4",
        space_before=22,
    )
    add_para(tf, f"{STUDENT['course']}  ·  {STUDENT['faculty']}  ·  AY {STUDENT['ay']}", size=13, color="7C7565", space_before=8)
    add_para(tf, STUDENT["university"], size=12, color="7C7565", space_before=6)

    # —— 2 Agenda ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Agenda", "Product story first — then architecture, shopping flows, screenshots, CPAD mapping")
    bullets_box(
        slide,
        [
            "What is ARCHIVE — brand & problem",
            "Tech stack & architecture",
            "E-commerce features end-to-end",
            "UI screenshots gallery",
            "Navigation, data & state",
            "CPAD Assignments 1–10 coverage",
            "Demo path & closing",
        ],
        Inches(0.6),
        Inches(1.7),
        Inches(6.5),
        Inches(5),
        size=18,
    )
    add_picture_safe(slide, "02_home", Inches(7.6), Inches(1.3), height=Inches(5.6))

    # —— 3 Product overview ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "What is ARCHIVE?", "Independent marketplace for authenticated vintage & pre-loved fashion")
    bullets_box(
        slide,
        [
            "Fewer, better things — one-of-one pieces, graded honestly",
            "Authenticated badge after multi-point inspection",
            "Editorial catalogue: sportswear, workwear, outerwear",
            "Full shop flow: browse → detail → cart → checkout → orders",
            "Companion to the ARCHIVE web brand (tanmays0/ARCHIVE)",
            "Built as one Android app covering all CPAD requirements",
        ],
        Inches(0.6),
        Inches(1.7),
        Inches(6.6),
        Inches(5),
    )
    add_picture_safe(slide, "09_about", Inches(7.6), Inches(1.3), height=Inches(5.6))

    # —— 4 Brand / design ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Brand & design system", "Bone · Ink · Clay palette — Fraunces display + DM Sans body")
    add_table(
        slide,
        [
            ["Token", "Hex", "Role"],
            ["Bone", "#F2EEE6", "Primary background"],
            ["Ink", "#181510", "Text & inverse surfaces"],
            ["Clay", "#A9522F", "Accent / CTAs / price"],
            ["Olive / Denim", "#6B6A54 / #4C5B66", "Secondary accents"],
            ["Stone", "#C9C0B4", "Borders & muted chrome"],
        ],
        Inches(0.6),
        Inches(1.6),
        Inches(7.2),
        Inches(4.2),
        [Inches(2.0), Inches(2.0), Inches(3.2)],
    )
    bullets_box(
        slide,
        [
            "Scroll-driven home hero (Reanimated)",
            "Product cards with authenticity badge",
            "Compact footer links — no button clutter",
            "Settings-style Profile navigation list",
        ],
        Inches(8.2),
        Inches(1.6),
        Inches(4.5),
        Inches(4.5),
        size=15,
    )

    # —— 5 Tech stack ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Tech stack", "Modern Expo toolchain targeting Pixel_9 Android")
    add_table(
        slide,
        [
            ["Layer", "Choice"],
            ["Runtime", "Expo SDK 58 / React Native 0.88"],
            ["Language", "TypeScript (strict)"],
            ["Navigation", "React Navigation — native stack + bottom tabs"],
            ["State", "Context + useReducer"],
            ["Persistence", "AsyncStorage (cart, profile, orders)"],
            ["Images", "expo-image (+ safe URI encoding)"],
            ["Motion", "react-native-reanimated"],
            ["Fonts", "Fraunces + DM Sans (@expo-google-fonts)"],
            ["Data", "Local products.json (26 SKUs, INR) + FakeStore API"],
            ["Tooling", "ESLint, Prettier, tsc --noEmit, Expo Doctor"],
        ],
        Inches(0.6),
        Inches(1.55),
        Inches(12.1),
        Inches(5.4),
        [Inches(2.8), Inches(9.3)],
    )

    # —— 6 Architecture ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Architecture", "Clear src/ boundaries — screens, UI kit, context, data, services")
    bullets_box(
        slide,
        [
            "App.tsx — providers (Cart, Wishlist, Profile, Orders) + RootNavigator",
            "src/screens/ — feature screens (Home, Catalogue, Cart, Checkout…)",
            "src/components/ui + product/ — reusable ProductCard, Button, Badge…",
            "src/context/ — cart / wishlist / profile / orders reducers",
            "src/navigation/ — typed RootStackParamList + MainTabs",
            "src/data/ — products.json, collections.json",
            "src/services/api.ts — public API fetch for Discover more",
            "docs/ — academic write-ups, viva notes, this submission pack",
        ],
        Inches(0.6),
        Inches(1.65),
        Inches(7.2),
        Inches(5.2),
        size=16,
    )
    add_picture_safe(slide, "11_tabs", Inches(8.2), Inches(1.4), height=Inches(5.5))

    # —— 7 E-commerce features ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "E-commerce features", "Premium storefront + complete shopping path")
    add_table(
        slide,
        [
            ["Area", "What ships in ARCHIVE"],
            ["Discover", "Home hero, collections, new arrivals, sale, wishlist"],
            ["Catalogue", "Search, category chips, sort, FlatList grid (INR)"],
            ["PDP", "Gallery, sizes, condition, authenticity, add to cart"],
            ["Cart", "Qty stepper, remove alerts, subtotal, AsyncStorage"],
            ["Checkout", "Validated form, gift wrap, order confirmation"],
            ["Account", "Login / Register · Profile · orders · notifications"],
            ["Auth gate", "Cart without login · Checkout requires session"],
            ["Trust", "About, authenticity lab, FAQ, shipping, returns, legal"],
            ["Consign", "Seller consign flow + size guide"],
            ["Partner feed", "Live FakeStore API — Discover more"],
        ],
        Inches(0.6),
        Inches(1.55),
        Inches(12.1),
        Inches(5.4),
        [Inches(2.4), Inches(9.7)],
    )

    # —— 8 Shopping journey ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Shopping journey", "Happy path from boot to order confirmation")
    bullets_box(
        slide,
        [
            "Hello ARCHIVE → Enter the Archive",
            "Home → Shop the Archive / New / Sale",
            "Catalogue → open Product Details",
            "Select size → Add to cart (popup + View cart)",
            "Cart → Sign in / Create account (required to order)",
            "Checkout → validate → Place order → Confirmation",
        ],
        Inches(0.6),
        Inches(1.7),
        Inches(6.4),
        Inches(5),
        size=17,
    )
    add_picture_safe(slide, "04_product", Inches(7.5), Inches(1.3), height=Inches(5.6))

    # —— 9 Catalogue & pricing ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Catalogue & pricing", "26 authenticated pieces · prices in Indian Rupees")
    bullets_box(
        slide,
        [
            "Local JSON catalogue (not mock lorem ipsum)",
            "Categories: Men, Women, Kids, Accessories",
            "Condition grades: Like New → Fair",
            "Collections: City Uniform, Air Index, Hardwood…",
            "formatPrice() with en-IN locale (₹)",
            "Compare-at prices for sale badges",
        ],
        Inches(0.6),
        Inches(1.7),
        Inches(6.4),
        Inches(5),
    )
    add_picture_safe(slide, "03_catalogue", Inches(7.5), Inches(1.3), height=Inches(5.6))

    # —— 10 Cart & checkout ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Cart, checkout & orders", "Validated commerce with persistent state")
    left = [
        "CartContext + useReducer",
        "QuantityStepper per line",
        "Subtotal updates live",
        "Persisted with AsyncStorage",
        "Empty state → Shop CTA",
    ]
    right = [
        "Checkout TextInputs + Switches",
        "Email / required-field Alerts",
        "Gift wrap option",
        "Order id + confirmation screen",
        "Orders history in Profile",
    ]
    bullets_box(slide, left, Inches(0.6), Inches(1.7), Inches(5.5), Inches(3.2), size=16)
    bullets_box(slide, right, Inches(6.5), Inches(1.7), Inches(6), Inches(3.2), size=16)
    add_picture_safe(slide, "05_cart", Inches(1.2), Inches(4.6), height=Inches(2.7))
    add_picture_safe(slide, "06_checkout", Inches(7.2), Inches(4.6), height=Inches(2.7))

    # —— 11 Auth: Login & Create account (full-bleed phone screenshots) ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(
        slide,
        "Sign in & create account",
        "Browse freely · cart without login · checkout requires an account",
    )
    # Large side-by-side phone screenshots (primary visual for this slide)
    add_picture_safe(slide, "12_login", Inches(0.45), Inches(1.35), height=Inches(5.85))
    add_picture_safe(slide, "13_register", Inches(3.55), Inches(1.35), height=Inches(5.85))
    bullets_box(
        slide,
        [
            "AuthContext + AsyncStorage session",
            "Create account: name, email, phone, password",
            "Sign in unlocks Checkout + Profile",
            "Guest can still add to cart",
            "Popups: welcome, errors, order placed",
            "Cart saved across auth redirect",
        ],
        Inches(6.85),
        Inches(1.55),
        Inches(5.9),
        Inches(5.2),
        size=16,
    )

    # —— 12 Profile & trust ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Profile, trust & content pages", "Account hub + storefront credibility")
    bullets_box(
        slide,
        [
            "Logged-in profile: View, Text, Image, TextInput, Button, Switch, ScrollView",
            "Nav groups: Account · Shop · Help & legal · The house",
            "About, Authenticity & Services, FAQ, Shipping, Returns",
            "Privacy, Terms, Consign, Size guide, Notifications",
            "How we build — platform comparative study",
            "Discover more — partner API feed",
        ],
        Inches(0.6),
        Inches(1.7),
        Inches(6.5),
        Inches(5),
        size=16,
    )
    add_picture_safe(slide, "07_profile", Inches(7.6), Inches(1.3), height=Inches(5.6))

    # —— 12 Navigation ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Navigation model", "Stack for flows · tabs for storefront chrome")
    bullets_box(
        slide,
        [
            "Bottom tabs: Home · Shop · Cart · Profile",
            "Stack screens: Product, Checkout, About, Discover…",
            "Typed params (productId, orderId, collectionId)",
            "Nested navigate MainTabs → CatalogueTab",
            "Cart badge shows live item count",
        ],
        Inches(0.6),
        Inches(1.7),
        Inches(6.5),
        Inches(5),
    )
    add_picture_safe(slide, "11_tabs", Inches(7.6), Inches(1.3), height=Inches(5.6))

    # —— 13 Data & API ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Data sources", "Local catalogue + live public API")
    bullets_box(
        slide,
        [
            "products.json — 26 ARCHIVE SKUs with images & INR",
            "collections.json — featured editorial racks",
            "FakeStore API — Discover more partner feed",
            "Loading / error / retry / pull-to-refresh",
            "Image URIs hardened for Android (+ encoding)",
            "Orders & profile saved locally on device",
        ],
        Inches(0.6),
        Inches(1.7),
        Inches(6.5),
        Inches(5),
    )
    add_picture_safe(slide, "08_discover", Inches(7.6), Inches(1.3), height=Inches(5.6))

    # —— 14 Screenshot gallery 1 ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "UI gallery — browse", "Boot · Home · Catalogue · Product")
    for i, name in enumerate(["01_hello", "02_home", "03_catalogue", "04_product"]):
        add_picture_safe(slide, name, Inches(0.35 + i * 3.25), Inches(1.45), height=Inches(5.6))

    # —— 15 Screenshot gallery 2 ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "UI gallery — commerce & account", "Cart · Checkout · Profile · Discover")
    for i, name in enumerate(["05_cart", "06_checkout", "07_profile", "08_discover"]):
        add_picture_safe(slide, name, Inches(0.35 + i * 3.25), Inches(1.45), height=Inches(5.6))

    # —— Auth gallery (dedicated) ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "UI gallery — authentication", "Sign in · Create account")
    add_picture_safe(slide, "12_login", Inches(2.2), Inches(1.25), height=Inches(5.9))
    add_picture_safe(slide, "13_register", Inches(6.9), Inches(1.25), height=Inches(5.9))

    # —— 16 Screenshot gallery 3 ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "UI gallery — brand & platform", "About · How we build · Tabs")
    for i, name in enumerate(["09_about", "10_tech", "11_tabs"]):
        add_picture_safe(slide, name, Inches(1.1 + i * 3.8), Inches(1.45), height=Inches(5.6))

    # —— 17 Why Expo / RN ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Why React Native + Expo?", "Assignment 2 verdict applied to a real storefront")
    add_table(
        slide,
        [
            ["Approach", "Fit for ARCHIVE"],
            ["Native", "Best performance — but two apps (Kotlin + Swift)"],
            ["Hybrid / WebView", "Fast web reuse — weaker lists, gestures, offline cart"],
            ["React Native + Expo", "Shared TS, FlatList, native nav, Pixel_9 demo workflow"],
        ],
        Inches(0.6),
        Inches(1.6),
        Inches(12.1),
        Inches(3.2),
        [Inches(3.2), Inches(8.9)],
    )
    bullets_box(
        slide,
        [
            "Curriculum concepts map 1:1 onto product screens",
            "Metro Fast Refresh for rapid UI iteration",
            "EAS / expo run:android — no separate Xcode for this course demo",
        ],
        Inches(0.6),
        Inches(5.1),
        Inches(12),
        Inches(2),
        size=15,
    )

    # —— 18 Assignments divider ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["ink"])
    t = slide.shapes.add_textbox(Inches(0.8), Inches(2.6), Inches(11.5), Inches(2))
    tf = add_text(t, "CPAD coverage", size=40, bold=True, color="F2EEE6", align=PP_ALIGN.CENTER)
    add_para(tf, "How the same ARCHIVE app satisfies Assignments 1–10", size=18, color="A9522F", space_before=14)

    # —— 19 Assignment map ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Assignments 1–10 — mapped to ARCHIVE")
    add_table(
        slide,
        [
            ["#", "Topic", "Evidence in app"],
            ["1", "Setup / Hello", "HelloArchiveScreen · Expo · Pixel_9"],
            ["2", "Comparative study", "How we build + docs write-up"],
            ["3", "Props / useState", "ProductCard, steppers, wishlist"],
            ["4", "Structure / reuse", "src/ tree + shared UI kit"],
            ["5", "Profile cores", "CustomerProfileScreen components"],
            ["6", "Flexbox / events", "Login/Register + Checkout Alerts"],
            ["7", "Multi-screen nav", "Stack + bottom tabs"],
            ["8", "Dynamic data", "JSON FlatList + FakeStore API"],
            ["9", "Storefront", "Home / About / Auth pages / Catalogue"],
            ["10", "Shopping app", "Auth-gated checkout + orders"],
        ],
        Inches(0.5),
        Inches(1.45),
        Inches(12.3),
        Inches(5.6),
        [Inches(0.6), Inches(3.2), Inches(8.5)],
    )

    # —— 20 Compact assignment highlights (2 slides of 5) ——
    assign_blocks = [
        ("A1–A2", ["Expo boot + Hello ARCHIVE", "Native / Hybrid / RN comparison", "How we build screen", "Pixel_9 Android target"]),
        ("A3–A4", ["Reusable ProductCard props", "Wishlist & quantity state", "Documented folders", "Context reducers"]),
        ("A5–A6", ["Profile core components", "Nav list (not button soup)", "Flexbox responsive UI", "Validated forms + Alerts"]),
        ("A7–A8", ["Stack + tab navigators", "Typed route params", "Local JSON FlatList", "Public API Discover more"]),
        ("A9–A10", ["Full storefront pages", "Search / filter / sort", "Cart persistence", "Checkout → confirmation"]),
    ]
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Assignment highlights", "Concept → product surface")
    for i, (title, lines) in enumerate(assign_blocks):
        col = i % 5
        x = Inches(0.4 + col * 2.55)
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.55), Inches(2.4), Inches(5.3))
        card.fill.solid()
        card.fill.fore_color.rgb = rgb(BRAND_HEX["card"])
        card.line.color.rgb = rgb(BRAND_HEX["stone"])
        ht = slide.shapes.add_textbox(x + Inches(0.12), Inches(1.7), Inches(2.15), Inches(0.4))
        add_text(ht, title, size=14, bold=True, color=BRAND_HEX["clay"])
        bullets_box(slide, lines, x + Inches(0.1), Inches(2.2), Inches(2.2), Inches(4.3), size=12)

    # —— 21 Demo script ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Live demo script (~2 min)", "Suggested viva walkthrough on Pixel_9")
    bullets_box(
        slide,
        [
            "Boot Hello ARCHIVE → Enter",
            "Home hero scroll → Shop the Archive",
            "Filter catalogue → open a piece → wishlist → add to cart",
            "Cart qty → Checkout → place order → confirmation",
            "Profile → Orders / How we build / Discover more",
            "Mention INR catalogue + AsyncStorage persistence",
        ],
        Inches(0.6),
        Inches(1.7),
        Inches(7),
        Inches(5),
        size=17,
    )
    add_picture_safe(slide, "01_hello", Inches(8.2), Inches(1.4), height=Inches(5.5))

    # —— 22 Repo / run ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["bone"])
    section_title(slide, "Repository & run", "github.com/tanmays0/ARCHIVE-APP")
    bullets_box(
        slide,
        [
            "npm install",
            "Start Pixel_9 AVD",
            "npx expo run:android   (first build is slow)",
            "Day-to-day: adb reverse tcp:8081 + npx expo start",
            "npm run typecheck · npm run lint",
            "Report + screenshots also in docs/submission/",
        ],
        Inches(0.6),
        Inches(1.7),
        Inches(12),
        Inches(5),
        size=18,
    )

    # —— 23 Closing ——
    slide = prs.slides.add_slide(blank)
    set_slide_bg(slide, BRAND_HEX["ink"])
    t = slide.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(11.5), Inches(4))
    tf = add_text(t, "Thank you", size=44, bold=True, color="F2EEE6", align=PP_ALIGN.CENTER)
    add_para(tf, "ARCHIVE — vintage, verified, one of one.", size=18, color="A9522F", space_before=16)
    add_para(tf, f"{STUDENT['name']}  ·  {STUDENT['enrollment']}  ·  Roll {STUDENT['roll']} / {STUDENT['division']}", size=16, color="C9C0B4", space_before=20)
    add_para(tf, f"{STUDENT['program']}  ·  {STUDENT['faculty']}", size=14, color="7C7565", space_before=10)
    add_para(tf, "github.com/tanmays0/ARCHIVE-APP", size=14, color="7C7565", space_before=8)

    prs.save(str(OUT_PPTX))
    print("PPTX →", OUT_PPTX, f"({len(prs.slides)} slides)")


if __name__ == "__main__":
    import sys

    if "--pdf-only" in sys.argv:
        build_pdf()
    elif "--pptx-only" in sys.argv:
        build_pptx()
    else:
        build_pdf()
        build_pptx()

