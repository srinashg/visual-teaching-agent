"""Create explanations table.

Revision ID: 0001
Revises:
"""

from alembic import op
import sqlalchemy as sa

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "explanations",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("question", sa.String(length=2000), nullable=False),
        sa.Column("difficulty", sa.String(length=50), nullable=False),
        sa.Column("explanation", sa.Text(), nullable=False),
        sa.Column("example", sa.Text(), nullable=False),
        sa.Column("common_mistake", sa.Text(), nullable=False),
        sa.Column("check_question", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_explanations_created_at_id", "explanations", ["created_at", "id"])


def downgrade() -> None:
    op.drop_index("ix_explanations_created_at_id", table_name="explanations")
    op.drop_table("explanations")
