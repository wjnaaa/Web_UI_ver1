from flask import Blueprint, render_template, request

main_bp = Blueprint("main", __name__)

@main_bp.route("/")
def home():
    modules = [
        {"name": "BD", "link": "/bd", "icon": "icons/bd.png"},
        {"name": "OF", "link": "/of", "icon": "icons/of.png"},
        {"name": "PO", "link": "/po", "icon": "icons/po.png"},
        {"name": "PPN", "link": "/ppn", "icon": "icons/ppn.png"},
    ]
    return render_template("home.html", modules=modules)

@main_bp.route("/chat", methods=["GET", "POST"])
def chatbot_frame():
    bot_response = ""
    if request.method == "POST":
        user_input = request.form.get("user_input", "")
        bot_response = f"<div><b>คุณ:</b> {user_input}</div><div><b>ERP Bot:</b> 🤖 ได้รับข้อความ: {user_input}</div>"
    return render_template("chat.html", bot_response=bot_response)

@main_bp.route('/approve')
def approve_document():
    return render_template('approve.html')

@main_bp.route('/of')
def of_page():
    return render_template('of.html')

@main_bp.route('/of/petty-cash')
def petty_cash_form():
    return render_template('of_petty_cash.html')

@main_bp.route('/of/purchase-requisition')
def purchase_requisition():
    return render_template('of_purchase_requisition.html')

@main_bp.route('/of/pr-status')
def pr_status():
    return render_template('of_pr_status.html')

@main_bp.route('/of/work-order')
def work_order():
    return render_template('of_work_order.html')

@main_bp.route('/of/billing-note-subc')
def billing_note_subc():
    return render_template('of_billing_note_subc.html')

@main_bp.route('/of/progress-submit')
def progress_submit():
    return render_template('of_progress_submit.html')