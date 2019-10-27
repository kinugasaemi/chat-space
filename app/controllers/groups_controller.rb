class GroupsController < ApplicationController
  def index
  end

  #groupのnewページでグループ情報を登録。
  def new
    @group = Group.new
    @group.users << current_user
  end

  #groupのnewベージでグループ作成完了。
  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path,notice: 'グループを作成しました'
    else
      flash[:alert] = '保存に失敗しました'
      render :new
    end
  end

  #groupのupdateページでグループ編集。編集されたgroup_messagesのpathへ。
  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  #現在ログイン中のユーザIDをparamsで取得。
  def group_params
    params.require(:group).permit(:name, user_ids: [] )
  end

  #現在グループIDをparamsで取得。
  def set_group
    @group = Group.find(params[:id])
  end

  def edit
  end
end
